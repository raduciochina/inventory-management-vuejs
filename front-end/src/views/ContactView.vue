<template>
    <h2>{{ this.title }}</h2>
    <div class="container">
      <form @submit.prevent="sendEmail">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" v-model="message" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  form {
    width: 500px;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
  }
  </style>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        message: '',
        title   : 'Contact Us'
      };
      
    },
    methods: {
      async sendEmail() {
        const response = await fetch('http://localhost:3000/api/contact/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'ciochinaradu19@stud.ase.ro',
            subject: `Message from ${this.name} (${this.email})`,
            text: this.message
          })
        });
        if (response.ok) {
          alert('Email sent successfully!');
        } else {
          alert('Failed to send email.');
        }
      }
    }
  };
  </script>