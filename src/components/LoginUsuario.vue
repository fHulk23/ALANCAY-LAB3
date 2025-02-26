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
.div {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
}

.input {
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  max-width: 300px;
}

.label {
  display: block;
  margin-bottom: 5px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  max-width: 300px;
}

button:disabled {
  background-color: #ccc;
}

@media (max-width: 600px) {
  .div {
    width: 90%;
  }
}
</style>