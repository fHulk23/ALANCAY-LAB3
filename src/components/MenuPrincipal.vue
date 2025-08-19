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
.Menu-Principal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.logo {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

nav ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
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

@media (max-width: 600px) {
  nav ul li {
    margin: 5px 0;
  }

  router-link {
    font-size: 16px;
  }
}
</style>