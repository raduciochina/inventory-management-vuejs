<template>
    <h1>Profile</h1>
    <div class="profile">
      <img id="profile-picture" :src="user.photoURL" alt="user photo">
      <div class="details">
      <h2 id="name">Name: {{ user.displayName }}</h2>
      <h2 id="email">Email: {{ user.email }}</h2>
      <h3>Member since: {{ user.metadata.creationTime.toString().slice(0,17) }}</h3>
      </div>
      <button class="btnUpdateProfile" @click="updateProfile">Update Profile</button>
      <input class="addPhoto" type="file" ref="fileInput" @change="uploadPhoto"/>

    </div>

    <div class="updateProfile" v-if="isClicked" >
    <form @submit.prevent="updateProfile" id="updateProfileForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="user.name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="user.email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="user.password">
      </div>
      <button type="submit" class="btnUpdateProfile">Submit</button>
      
    </form>
    </div>
  
    

</template>

<script>
import { getAuth, updateProfile} from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default{
  data(){
    return{
      isClicked: false,
      photoUrl: '',
      user: getAuth().currentUser,
    }
  },

  methods:
  {
    updateProfile(){
      this.isClicked = !this.isClicked;
    },
    click1(){
      
    },
    uploadPhoto(){
      const file = this.$refs.fileInput.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        console.log(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.photoUrl = downloadURL;
          updateProfile(this.user, {
            photoURL: this.photoUrl,
          }).then(() => {
            console.log('photo updated');
          }).catch((error) => {
            console.log(error);
          });
        });
      });
    },
  },
}

</script>

<style scoped>
.profile{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 50%;
  padding: 20px;
  border-radius: 10px;
}
#profile-picture{
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.updateProfile{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 50%;
  border: 1px solid black;
  padding: 20px;
  border-radius: 10px;
}
.addPhoto{
  margin: 10px;
  /* style */
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
.form-group{
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.btnUpdateProfile{
  margin: 10px;
  /* style */
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}





</style>