<template>
    <div class="add-item-form">
      <h2>{{ formTitle }}</h2>
      <form id="addform" @submit.prevent="submitForm" >
        <label for="name">Name:</label><br>
        <input type="text" v-model="form.name" id="name" :placeholder="this.itemName"><br>
        <label for="name">Description:</label><br>
        <input type="text" v-model="form.description" id="description" :placeholder="this.description"><br>
        <label for="price">Price:</label><br>
        <input type="number" v-model="form.price" id="price" :placeholder="this.price"><br>
        <label for="name">Quantity:</label><br>
        <input type="number" v-model="form.quantity" id="quantity" :placeholder="this.quantity"><br>
        <label for="category">Category:</label><br>
        <select v-model="form.category" id="category"><br>
          <option v-for="category in categories" :value="`categories/`+ category.id">{{ category.data.name }}</option>
        </select>
        <br>
        <input id="addBtn" type="submit" value="Submit">
      </form>    
    </div>
  </template>
  
  <script>
  import Axios, { AxiosResponse, AxiosError } from 'axios';
  import { getAuth } from 'firebase/auth';
  
  export default {
    name: 'AddEditItem',
    data() {
      return {
        form: {
          ownerId: getAuth().currentUser.uid,
          name: '',
          price: '',
          description: '',
          quantity: '',
          category: '',
        },
        formTitle: 'Add Item',
        categories: [],
      };
    },
    created() {
      this.fetchCategories();
    },
    methods: {

      validateForm(){
        if(this.form.name == '' || this.form.price == '' || this.form.description == '' || this.form.quantity == '' || this.form.category == ''){
          alert('Please fill in all fields');
          return false;
        }
        return true;
      },
      async submitForm() {
        await Axios.post('http://localhost:3000/api/items/add', this.form)
        this.form = {
          name: '',
          price: '',
          description: '',
          quantity: '',
          category: '',
        };
        this.$emit('form-submitted');
      },
      async fetchCategories(){
        await Axios.get('http://localhost:3000/api/categories/getAll')
        .then(response => {
          console.log(response.data);
          this.categories = response.data;
        })
        .catch(error => {
          console.log(error);
        })

      }
    },
  };
  </script>
  
  <style>
.add-item-form {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    width: 50%;
    margin: 0 auto;
  }
  #addBtn{
    width: 100px;
    height: 30px;
    margin-top: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  #addBtn:hover {
    background-color: #45a049;
  }
  
  </style>