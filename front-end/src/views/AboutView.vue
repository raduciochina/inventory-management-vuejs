<template>
  <div class="about">

    <h1>About</h1>
    <h2>{{ user }}</h2>

  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default{

  setup(){
    const user = getAuth().currentUser;
    
    return{
      user,
    }
  }
}

</script>
