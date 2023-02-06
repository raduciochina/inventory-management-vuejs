<template>
    <div>
    <div class="search-bar">
      <input type="text" placeholder="Search" v-model="search">
      <button @click="searchItem()">Search</button>
    </div>
    <div class="card-container">
      <div v-for="item in items" :key="item.id" class="card">
        <img :src="item.data.imageUrl" alt="Product Image">
        <h3>{{ item.data.name }}</h3>
        <div class="items-data">
        <p>Descriere: {{ item.data.description }}</p>
        <p>Pret: {{ item.data.price }} RON</p>
        <p>Cantitate: {{ item.data.quantity }} buc.</p>
        </div>
        <div class="card-actions">
          <button @click="editItem(item)"><font-awesome-icon id="edit-icon" icon="fa-regular fa-pen-to-square" />  Edit</button>
          <button @click="deleteItem(item)"><font-awesome-icon id="delete-icon" icon="fa-solid fa-trash" />  Delete</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="!items.length" class="text-center">No products found</div>

  </template>
  
  <script>
  import Axios, { AxiosResponse, AxiosError } from 'axios';
  import { getAuth } from 'firebase/auth';

  export default {
    name: 'ItemsList',
    data() {
      return {
        items: [],
        toEdit: true,
      };
    },
    props: {
      id: {
        type: String,
      },
    },
    created() {
      this.fetchItems();
    },
    methods: {
      async fetchItems() {
      await Axios.get(`http://localhost:3000/api/items/getAllByCategory/${this.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        // get the items for the current user
        const auth = getAuth();
        const currentUser = auth.currentUser;
        this.items = response.data.filter((item) => {
          return item.data.ownerId === currentUser.uid;
        });
      }) 
      },
      async deleteItem(item) {
        // are you sure you want to delete?
        await Axios.delete(`http://localhost:3000/api/items/delete/${item.id}`);
        this.fetchItems();
      },
      editItem(item) {
        this.$store.commit('SET_EDIT_INFO', item);
        this.$router.push({ name: 'editItem', params: { toEdit: this.toEdit } });
      },
      searchItem() {
        this.items = this.items.filter((item) => {
          return item.data.name.toLowerCase().match(this.search.toLowerCase());
        });
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
.items-data{
  display: flex;
  flex-direction: column;
  text-align: left;


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
  