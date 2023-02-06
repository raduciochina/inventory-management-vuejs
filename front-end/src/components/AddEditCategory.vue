<template>
    <div class="add-category-form">
    <h2>{{ formTitle }}</h2>
        <form @submit.prevent="submitForm">
        <label for="name" >Name:</label><br>
        <input type="text" v-model="form.name" id="name" :placeholder="this.categoryName"><br>
        <input id="addBtn" type="submit" value="Submit">
        </form>
    </div>
</template>

<script>
  import Axios, { AxiosResponse, AxiosError } from 'axios';
  import { getAuth } from 'firebase/auth';

  export default {
    props: {
        toEdit:{
            type: Boolean
        }
    },
    name :'AddEditCategory',
    data(){
      return{
        form:{
          ownerId: getAuth().currentUser.uid,
          name: '',
        },
        formTitle: 'Add Category',
      };
    },
    methods:{
      validateForm(){
        if(this.form.name == ''){
          alert('Please fill in all fields in order to add a category');
          return false;
        }
        return true;
      },
      submitForm(){
        if(this.validateForm()){
          Axios.post('http://localhost:3000/api/categories/add', this.form)
          .then((res) => {
            this.$router.push({ name:'home' });
          })
          .catch((err) => {
            console.log(err);
          });
        }
      },
    },
  }
  

</script>

<style>

.add-category-form{
  margin: 0 auto;
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 40px;
}
.red-square{
  width: 100px;
  height: 100px;
  background-color: red;
}


</style>