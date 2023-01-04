<template>
        <h1>Create an Account</h1>
        <div class = "form">
            <p><input type="text" placeholder="Name" v-model="name" /> </p>        
            <p><input type="text" placeholder="Email" v-model="email" /> </p>        
            <p ><input type="password" placeholder="Password" v-model="password" /> </p>      
        </div>
        <p><button id="btnSubmit" @click="register">Submit</button></p>  
         <p><button id="btnGoogle" @click="signInWithGoogle">Sign In With Google</button></p> 
</template>

<script>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import router from '../router';
import { useStore } from 'vuex';

export default{
    setup() {
        const store = useStore();

        const email = ref('');
        const password = ref('');
        const name = ref('');

        const register = () => {
         store.dispatch('register', {email: email.value, password: password.value, name: name.value});
        }

        return{
            register,
            email,
            password,
            name,
        }
    }


    // createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    // .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     console.log(user + " is signed in");
    //     router.push("/");
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