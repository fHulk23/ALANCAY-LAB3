<template>
    <div class="div" >

      <h1>Iniciar Sesión</h1>

      <form @submit.prevent="handleLogin">
        <label class="label" for="user_id">INGRESE SU ID de Usuario</label> 
        <input
        class="input"
        type="text"
        placeholder="Ingrese su id de Usuario"
        id="user_id"
        v-model="userId"
        required
      />
      
      <button type="submit" :disabled="!userId">Iniciar Sesión</button>
   </form>
  </div>
</template>
  
  <script>
  export default {
    name: "LoginUsuario",
    data() {
      return {
        userId: ''
      };
    },
    methods: {
      handleLogin() {
        if (this.userId) {
          localStorage.setItem('user_id', this.userId);
          this.$router.push('/Menuprincipal');
        } else {
          alert("Por favor ingrese un ID de usuario.");
        }
      }
    }
  };
  </script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

.div {
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Anton', sans-serif;
  color: #222222;
}

h1 {
  font-size: 28px;
  margin-bottom: 30px;
  color: #27AE60;
}

.label {
  display: block;
  margin-bottom: 8px;
  color: #222222;
  font-size: 16px;
  text-align: left;
  width: 100%;
  max-width: 300px;
}

.input {
  padding: 12px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 300px;
  border: 2px solid #27AE60;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input:focus {
  border-color: #F1C40F;
}

button {
  padding: 12px 20px;
  background-color: #F1C40F;
  color: #222222;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 6px;
  width: 100%;
  max-width: 300px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover:enabled {
  background-color: #27AE60; 
  color: #ffffff;
  transform: scale(1.02);
}

button:disabled {
  background-color: #cccccc;
  color: #888888;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .div {
    width: 90%;
  }

  h1 {
    font-size: 22px;
  }
}
</style>
