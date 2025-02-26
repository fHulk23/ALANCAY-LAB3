<template>
  <div class="historial">
    <h2>Historial de Movimientos</h2>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-if="movimientos.length === 0" class="no-movimientos">
      <p>No tienes movimientos registrados.</p>
    </div>

    <ul v-if="movimientos.length > 0">
      <li v-for="movimiento in movimientos" :key="movimiento._id">
        <div>
          <p><strong>Criptomoneda:</strong> {{ movimiento.crypto_code.toUpperCase() }}</p>
          <p><strong>Cantidad:</strong> {{ movimiento.crypto_amount }}</p>
          <p><strong>Monto (ARS):</strong> {{ movimiento.money }}</p>
          <p><strong>Acción:</strong> {{ movimiento.action === 'purchase' ? 'Compra' : 'Venta' }}</p>
          <p><strong>Fecha y hora:</strong> {{ formatDate(movimiento.datetime) }}</p>
        </div>

        <div>
          <button @click="editarMovimiento(movimiento._id)">Editar</button>
          <button @click="borrarMovimiento(movimiento._id)">Borrar</button>
        </div>
      </li>
    </ul>

    <button v-if="movimientos.length > 0" @click="cargarMas">Cargar más</button>
  </div>
</template>

<script>
import apiAxios from '@/service/apiAxios';

export default {
  name: "HistorialDeTransaccionesTatu",
  data() {
    return {
      movimientos: [],
      error: '',   
    };
  },
  created() {
    this.obtenerMovimientos();
  },
  methods: {
    async obtenerMovimientos() {
      try {
        const userId = localStorage.getItem("user_id");

        const response = await apiAxios.get(`/transactions?q={"user_id":"${userId}"}`);
        this.movimientos = response.data;
      } catch (error) {
        this.error = 'Error al obtener los movimientos.';
        console.error(error);
      }
    },

    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleString();
    },

    editarMovimiento(id) {
      this.$router.push({ name: 'editarMovimiento', params: { id } }); 
    },

    async borrarMovimiento(id) {
      if (confirm('¿Estás seguro de que deseas borrar este movimiento?')) {
        try {
          await apiAxios.delete(`/transactions/${id}`);
          this.movimientos = this.movimientos.filter((mov) => mov._id !== id);
        } catch (error) {
          this.error = 'Error al borrar el movimiento.';
          console.error(error);
        }
      }
    },

    cargarMas() {
      console.log('Cargando más movimientos...');
    },
  },
};
</script>

<style scoped>
.historial {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

button {
  padding: 5px 10px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  text-align: center;
}

.no-movimientos {
  text-align: center;
}

button {
  margin-top: 10px;
}
</style>
