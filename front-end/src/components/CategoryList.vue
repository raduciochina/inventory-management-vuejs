<template>

<div>
    <div class="search-bar">
      <input type="text" placeholder="Search" v-model="search">
      <button @click="searchCategory()">Search</button>
    </div>
    <div class="card-container">
      <div v-for="category in categories" :key="category.id" class="card">
        <img :src="category.data.imageUrl" alt="Category Image"  @click="accessCategory(category.id)">
        <h3>{{ category.data.name }}</h3>
        <!-- <p>{{ category.id }}</p> -->
        <div class="card-actions">
          <button @click="editCategory(category)"><font-awesome-icon id="edit-icon" icon="fa-regular fa-pen-to-square" />  Edit</button>
          <button @click="deleteCategory(category)"><font-awesome-icon id="delete-icon" icon="fa-solid fa-trash" />  Delete</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="!categories.length" class="text-center">No categories found</div>

</template>

<script>

import Axios, { AxiosResponse, AxiosError } from 'axios';
import { getAuth } from 'firebase/auth';

  export default {
    name: 'CategoryList',
    data() {
      return {
        categories: [],
        toEdit: true,
      };
    },

    created() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        await Axios.get('http://localhost:3000/api/categories/getAll')
        .then(response => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        this.categories = response.data.filter((category) => {
          return category.data.ownerId === currentUser.uid;
        });
      }) 
    },
    //edit category on the same view page
    editCategory(category) {
      this.$store.commit('SET_EDIT_INFO', category);
      this.$router.push({ name: 'editCategory', params: { toEdit: this.toEdit } });
      // this.$router.push({ name: 'editCategory', params: { id: category.id } });
    },
    searchCategory() {
        this.categories = this.categories.filter((category) => {
          return category.data.name.toLowerCase().match(this.search.toLowerCase());
        });
    },
    accessCategory(id) {
        this.$router.push({ name: 'itemList', params: { id } });
    },
    deleteCategory(category) {
      Axios.delete(`http://localhost:3000/api/categories/delete/${category.id}`)
      .then(response => {
        this.fetchCategories();
      })
    },
    },
  };

</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

#delete-icon {
  color: red;
}

#edit-icon {
  color: blue;
}

.card {
  box-sizing: border-box;
  width: 30%;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}

.card h3 {
  margin: 10px 0;
}

.card p {
  margin: 5px 0;
  font-size: 14px;
  color: #777;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  width: 100%;
}

.card-actions button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #eee;
  cursor: pointer;
}

.card-actions button:hover {
  background-color: #ddd;
}

</style>