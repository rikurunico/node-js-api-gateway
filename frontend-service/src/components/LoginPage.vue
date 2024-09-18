<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2 class="login-title">Login</h2>
      <input v-model="username" placeholder="Username" required class="input-field" />
      <input v-model="password" type="password" placeholder="Password" required class="input-field" />
      <button type="submit" class="submit-button">Login</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/auth/login', {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('token', response.data.token); // Save token in localStorage
        this.$router.push('/items'); // Redirect to items page after login
      } catch (error) {
        this.error = 'Login failed: ' + (error.response?.data?.message || 'Unknown error');
      }
    }
  }
};
</script>

<style scoped>
/* Container setup */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0; /* Light gray background for contrast */
  padding: 2rem;
}

/* Form styling */
.login-form {
  background: #fff; /* Background putih */
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.1); /* Border tipis hitam transparan */
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* Haluskan shadow untuk kesan elegan */
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #000; /* Warna teks hitam untuk kontras */
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  border-bottom: 2px solid #000; /* Border bawah hitam */
  padding-bottom: 0.5rem;
  width: 100%;
  text-align: center;
}

/* Input fields */
.input-field {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc; /* Border abu-abu untuk input */
  border-radius: 8px;
  background-color: #f8f8f8; /* Latar belakang abu-abu sangat terang */
  font-size: 1rem;
  color: #333; /* Teks abu-abu gelap */
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #000;
  background-color: #f8f8f8;
  outline: none;
}

/* Submit button */
.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #000;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  text-align: center;
}

.submit-button:hover {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
}

/* Error message */
.error-message {
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 1rem;
}
</style>
