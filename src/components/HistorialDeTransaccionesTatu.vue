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
        <div class="info">
          <p><strong>Criptomoneda:</strong> {{ movimiento.crypto_code.toUpperCase() }}</p>
          <p><strong>Cantidad:</strong> {{ movimiento.crypto_amount }}</p>
          <p><strong>Monto (ARS):</strong> {{ movimiento.money }}</p>
          <p><strong>Acción:</strong> {{ movimiento.action === 'purchase' ? 'Compra' : 'Venta' }}</p>
          <p><strong>Fecha y hora:</strong> {{ formatDate(movimiento.datetime) }}</p>
        </div>

        <div class="acciones">
          <button class="btn-editar" @click="editarMovimiento(movimiento._id)">Editar</button>
          <button class="btn-borrar" @click="borrarMovimiento(movimiento._id)">Borrar</button>
        </div>
      </li>
    </ul>

    <button class="boton-volver" @click="volverMenu()">Volver al Menú</button>
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
          this.obtenerMovimientos();
        } catch (error) {
          this.error = 'Error al borrar el movimiento.';
          console.error(error);
        }
      }
    },

    volverMenu() {
      this.$router.push('/Menuprincipal');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

.historial {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Anton', sans-serif;
  color: #222222;
}

h2 {
  text-align: center;
  font-size: 26px;
  color: #27AE60;
  margin-bottom: 25px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  border: 2px solid #27AE60;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info p {
  margin: 5px 0;
  font-size: 16px;
}

.acciones {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 10px 15px;
  font-size: 14px;
  font-family: 'Anton', sans-serif;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-editar {
  background-color: #F1C40F;
  color: #222222;
}

.btn-editar:hover {
  background-color: #27AE60;
  color: #ffffff;
}

.btn-borrar {
  background-color: #E74C3C;
  color: white;
}

.btn-borrar:hover {
  background-color: #C0392B;
}

.boton-volver {
  margin-top: 30px;
  width: 100%;
  background-color: #27AE60;
  color: #ffffff;
  font-size: 16px;
  padding: 12px;
  border-radius: 10px;
}

.boton-volver:hover {
  background-color: #F1C40F;
  color: #222222;
  transform: scale(1.02);
}

.error {
  background-color: #ffdddd;
  color: red;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid red;
  border-radius: 8px;
  text-align: center;
}

.no-movimientos {
  text-align: center;
  color: #999;
  font-size: 16px;
  margin-top: 20px;
}

@media (max-width: 600px) {
  .historial {
    padding: 20px;
  }

  li {
    padding: 15px;
  }

  .info p {
    font-size: 14px;
  }

  .acciones {
    flex-direction: column;
  }

  .boton-volver {
    font-size: 14px;
  }
}
</style>
