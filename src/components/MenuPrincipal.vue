<template>
    <div class="Menu-Principal main">
      <img class="logo" src="../../public/TATU COIN Logo - Black with White Background - 5000x5000 (1).png" alt="Logo tatucoin">
      <h1>Bienvenido a tu plataforma de criptomonedas</h1>
      <nav>
        <ul>
          <li><router-link to="/OperacionesdeCompra">Dar de alta una compra</router-link></li>
          <li><router-link to="/OperacionesdeVenta">Dar de alta una venta</router-link></li>
          <li><router-link to="/HistorialDeTransaccionesTatu">Historial De Transacciones Tatu</router-link></li>
          <li><router-link to="/EstadoActualizado">Estado Actualizado de tu Billetera</router-link></li>
          <li><router-link to="/AnalisisDeInversion">Analisis De Inversion</router-link></li>
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
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

.Menu-Principal {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Anton', sans-serif;
  color: #222222;
  text-align: center;
}

.logo {
  max-width: 200px;
  height: auto;
  margin-bottom: 30px;
}

h1 {
  font-size: 28px;
  margin-bottom: 40px;
  color: #27AE60;
}

nav ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 400px;
}

nav ul li {
  margin: 15px 0;
}

nav ul li a {
  display: block;
  background-color: #F1C40F; 
  color: #222222;
  text-decoration: none;
  padding: 15px 20px;
  font-size: 18px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  font-weight: bold;
}

nav ul li a:hover {
  background-color: #27AE60;
  color: #ffffff;
  transform: scale(1.03);
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
}

@media (max-width: 600px) {
  h1 {
    font-size: 22px;
  }

  nav ul li a {
    font-size: 16px;
    padding: 12px 16px;
  }
}
</style>
