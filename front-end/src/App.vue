<template>
  <nav class="nav-bar">
    <div id="links" v-if="$store.state.user">
      <router-link to="/">Inventory</router-link> |
      <router-link to="/about">Profile</router-link> |
      <router-link to="/contact">Contact</router-link> |
      <router-link to="/add-item">Add</router-link> |
      <!-- <button id="generate" @click="generateData()">Generate</button> -->
      <button id="logout" @click="$store.dispatch('logout')">Log Out</button>
    </div>
    <div id="links" v-else="">
      <router-link to="/sign-in">Sign In</router-link> |
      <router-link to="/register">Register</router-link> 
    </div>
  </nav>
  <router-view/>
</template>

<script>
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';


export default{
  setup(){
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch('fetchUser');
    })
  },


}

</script>

<style>

.nav-bar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f2f2f2;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;

}
#links{
  text-decoration: none!important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  font-size: 1.2rem;
  color: #333;
}

#logout {
  background-color: tomato;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

}
#generate {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
