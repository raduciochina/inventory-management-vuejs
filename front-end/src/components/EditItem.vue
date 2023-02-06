<template>

<div class="edit-item-form">
      <h2>{{ formTitle }}</h2>
      <form id="addform" @submit.prevent="submitForm" >
        <label for="name">Name:</label><br>
        <input type="text" v-model="form.name" id="name" :placeholder="this.itemName"><br>
        <!-- <span v-if="form.name.$error">Name is required</span><br> -->
        <label for="name">Description:</label><br>
        <input type="text" v-model="form.description" id="description" :placeholder="this.description"><br>
        <!-- <span v-if="form.description.$error">Description is required</span><br> -->
        <label for="price">Price:</label><br>
        <input type="number" v-model="form.price" id="price" :placeholder="this.price"><br>
        <!-- <span v-if="form.price.$error">Price is required</span><br> -->
        <label for="name">Quantity:</label><br>
        <input type="number" v-model="form.quantity" id="quantity" :placeholder="this.quantity"><br>
        <!-- <span v-if="form.quantity.$error">Quantity is required</span><br> -->
        <label for="category">Category:</label><br>
        <!-- <input type="text" v-model="form.category" id="category"><br> -->
        <!-- dropdown with available categories -->
        <select v-model="form.category" id="category"><br>
          <option v-for="category in categories"  :value="`categories/`+ category.id">{{ category.data.name }}</option>
        </select>
        <!-- <span v-if="form.category.$error">Category is required</span><br> -->
        <br>
        <input id="editBtn" type="submit" value="Submit">
      </form>    
    </div>
    </template>
    
    <script>
    
    import Axios, { AxiosResponse, AxiosError } from 'axios';
    import { getAuth } from 'firebase/auth';
    
    export default{
        name: 'EditItem',
        data(){
        return{
             form: {
                ownerId: getAuth().currentUser.uid,
                name: '',
                price: '',
                description: '',
                quantity: '',
                category: '',
                },
                categories: [],
                formTitle: 'Edit Item',
                itemId: '',
                itemName: '',
                category: '',
                quantity: '',
                price: '',
                description: '',
            };
        },
        
        created(){
            this.getEditInfo();
            this.fetchItem();
            this.fetchCategories();
        },
    
        methods: {
            getEditInfo(){
            if(this.$store.state.editInfo.data == undefined){
                return;
            }
            this.itemId = this.$store.state.editInfo.id;
            this.itemName = this.$store.state.editInfo.data.name;
            this.description = this.$store.state.editInfo.data.description;
            this.category = this.$store.state.editInfo.data.category;
            this.quantity = this.$store.state.editInfo.data.quantity;
            this.price = this.$store.state.editInfo.data.price;

            this.formTitle = 'Edit Item';
            this.$store.commit('CLEAR_EDIT_INFO')
            },
            fetchItem(){
                Axios.get('http://localhost:3000/api/items/' + this.itemId)
                .then((res) => {
                    this.form.name = res.data.data.name;
                    this.form.description = res.data.data.description;
                    this.form.category = res.data.data.category;
                    this.form.quantity = res.data.data.quantity;
                    this.form.price = res.data.data.price;
                })

            },
            validateForm(){
            if(this.form.name == ''){
              alert('Please fill in all fields in order to edit the item');
              return false;
            }
            return true;
          },
            submitForm(){
            if(this.validateForm()){
                Axios.put('http://localhost:3000/api/items/edit/' + this.itemId , this.form)
                .then((res) => {
                    this.$store.commit('CLEAR_EDIT_INFO');
                    this.$router.go(-1);
                    // this.$router.push('/item-list/' + this.form.category);
                })
                .catch((err) => {
                    console.log(err);
                })
            }
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
    
    }
    
    </script>
    
    <style>
    
    .edit-item-form{
      margin: 0 auto;
      width: 50%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 40px;
    }
    
    #editBtn{
      background-color: #4CAF50;
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    
    </style>