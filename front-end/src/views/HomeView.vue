<template>
    <h1>Inventory Management</h1>
    <CategoryList></CategoryList>
    <button id="generate-data" @click="generateData()">Generate Data using ChanceJS</button>
</template>

<script>
import CategoryList from '../components/CategoryList.vue';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

export default {
  name: 'HomeView',
  components: {
    CategoryList,
  },
  data() {
    return {
      ownerId: getAuth().currentUser.uid,
    };
  },
  methods: {
    generateData() {
      axios.get('http://localhost:3000/api/data/generate-data', {
        params: {
          ownerId: this.ownerId,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  },
};

</script>

<style>
.items {

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

table {
  border-collapse: collapse;
}

#generate-data {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 4px 2px;
  cursor: pointer;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

#addItem {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

</style>
