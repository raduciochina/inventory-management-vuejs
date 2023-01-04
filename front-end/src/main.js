import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCzLswJ_34ey1fuBO0oSzT3QDmcYjKuSx0",
//   authDomain: "tic-project-f7fca.firebaseapp.com",
//   projectId: "tic-project-f7fca",
//   storageBucket: "tic-project-f7fca.appspot.com",
//   messagingSenderId: "1091231147526",
//   appId: "1:1091231147526:web:0996f93efbb8b19adc8587",
//   measurementId: "G-1FY2S0NWM1" 
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
