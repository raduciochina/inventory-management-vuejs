<template>
    <h1>Sign In Into Account</h1>
    <p id="email"><input type="text" placeholder="Email" v-model="email" /> </p>        
    <p id="password"><input type="password" placeholder="Password" v-model="password" /> </p>      
    <p><button id="btnSubmit" @click="signIn">Submit</button></p>  
    <p><button id="btnGoogle" @click="signInWithGoogle">Sign In With Google</button></p>  
    <!-- need an account -->
    <p>Don't have an account? <router-link to="/register">Register</router-link></p>
</template>

<script>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from '../router';
import { useStore } from 'vuex';

export default{

    setup(){
        const store = useStore();

        const email = ref('');
        const password = ref('');
        const name = ref('');

        const signIn = () => {
        store.dispatch('signIn', {email: email.value, password: password.value});
        }

        return {
            signIn,
            email,
            password,
        }

    }
// signInWithEmailAndPassword(getAuth(), email.value, password.value)
// .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     console.log(user + " is signed in");
//     router.push('/');
//     // ...
// })
// .catch((error) => {
//     console.log(error);
//     // ..
// });
}

const signInWithGoogle = () => {

}

</script>

<style scoped>

#btnSubmit {
    background-color: #4CAF50; 
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;

}
#btnGoogle {
    background-color: #4285F4; 
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}


</style>