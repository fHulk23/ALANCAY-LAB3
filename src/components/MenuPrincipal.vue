<template>
    <div class="Menu-Principal">
      <img class="logo" src="../../public/TATU COIN Logo - Black with White Background - 5000x5000 (1).png" alt="Logo tatucoin">
      <h1>Bienvenido a tu plataforma de criptomonedas</h1>
      <nav>
        <ul>
          <li><router-link to="/compra">Dar de alta una compra</router-link></li>
          <li><router-link to="/venta">Dar de alta una venta</router-link></li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: "MenuPrincipal",
  };
  </script>
  
  <style scoped>
  .main {
    text-align: center;
  }
  
  nav ul {
    list-style-type: none;
    padding: 0;
  }
  
  nav ul li {
    margin: 10px 0;
  }
  
  router-link {
    text-decoration: none;
    color: #007bff;
    font-size: 18px;
  }
  
  router-link:hover {
    text-decoration: underline;
  }
  </style>
  