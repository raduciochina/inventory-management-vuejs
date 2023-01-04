<template>
  <nav>
    <div v-if="$store.state.user">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <button id="logout" @click="$store.dispatch('logout')">Log Out</button>
    </div>
    <div v-else="">
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
  }
}

</script>

<style>
#logout {
  background-color: tomato;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
