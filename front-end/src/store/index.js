import { createStore } from 'vuex';
import router from '../router';
import { auth } from '../firebase/initFirebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , updateProfile} from 'firebase/auth';

export default createStore({
  state: {
    user: null
  },
  getters: {
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_EDIT_INFO(state, info) {
      state.editInfo = info;
    },
    CLEAR_EDIT_INFO(state) {
      state.editInfo = '';
    }
  },
  actions: {
    async signIn({ commit }, details){
      const { email, password, name } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('User not found');
            break;
          case 'auth/wrong-password':
            alert('Wrong password');
            break;
          default:
            alert('Something went wrong');
            break;
        }
        return ;
      }
      commit('SET_USER', auth.currentUser);    
      router.push('/');

    },
    async logout({ commit }){
      await signOut(auth);
      commit('CLEAR_USER');
      router.push('/sign-in');
    },
    async register({ commit }, details){
      const { email, password, name } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, { displayName: name });
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('Email already in use');
            break;
          case 'auth/invalid-email':
            alert('Invalid email');
            break;
          case 'auth/operation-not-allowed':
            alert('Operation not allowed');
            break;
          case 'auth/weak-password':
            alert('Weak password');
            break;
          default:
            alert('Something went wrong');
        }
        return ;
      }
      
      commit('SET_USER', auth.currentUser);    
      router.push('/');
    },
    fetchUser({ commit }) {
      auth.onAuthStateChanged(async user => {
        if(user == null) {
          commit('CLEAR_USER');
        } else {
          commit('SET_USER', user);
          if(router.isReady() && router.currentRoute.value.path === '/sign-in') {
            router.push('/');
          }
        }
      })
    },
  },
  modules: {
  }

})
