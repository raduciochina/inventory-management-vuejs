<template>

<div class="edit-category-form">
    <h2>{{ formTitle }}</h2>
        <form @submit.prevent="submitForm">
        <label for="name" >Name:</label><br>
        <input type="text" v-model="form.name" id="name" :placeholder="this.categoryName"><br>
        <input id="editBtn" type="submit" value="Update">
        </form>
    </div>

</template>

<script>

import Axios, { AxiosResponse, AxiosError } from 'axios';
import { getAuth } from 'firebase/auth';

export default{

    name: 'EditCategory',
    data(){
        return{
            form: {
                ownerId: getAuth().currentUser.uid,
                name: '',
            },
            formTitle: 'Edit Category',
            categoryName: '',
            categoryId: '',
        };
    },
    
    created(){
        this.getEditInfo();
        this.fetchCategory();
    },

    methods: {

     getEditInfo(){
        if(this.$store.state.editInfo.data == undefined || this.$store.state.editInfo == null){
          return;
        }
        this.categoryName = this.$store.state.editInfo.data.name;
        this.categoryId = this.$store.state.editInfo.id;
        this.formTitle = 'Edit Category';
        this.$store.commit('CLEAR_EDIT_INFO')
      },
        fetchCategory(){
            Axios.get('http://localhost:3000/api/categories/' + this.categoryId)
            .then((res) => {
                this.categoryName = res.data.name;
            })
            .catch((err) => {
                console.log(err);
            });
        },
        validateForm(){
        if(this.form.name == ''){
          alert('Please fill in all fields in order to edit the category');
          return false;
        }
        return true;
      },
        submitForm(){
        if(this.validateForm()){
          Axios.put('http://localhost:3000/api/categories/edit/' + this.categoryId, this.form)
          .then((res) => {
            this.$store.commit('CLEAR_EDIT_INFO')
            this.$router.push({ name:'home'});
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

.edit-category-form{
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