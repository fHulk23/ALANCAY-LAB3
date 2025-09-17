<template>
  <div class="transaccion">
    <h2>Detalles de la Transacción</h2>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-if="transaccion" class="detalle">
      <p><strong>Criptomoneda:</strong> {{ transaccion.crypto_code.toUpperCase() }}</p>
      <p><strong>Cantidad:</strong> {{ transaccion.crypto_amount }}</p>
      <p><strong>Monto (ARS):</strong> {{ transaccion.money }}</p>
      <p><strong>Acción:</strong> {{ transaccion.action === 'purchase' ? 'Compra' : 'Venta' }}</p>
      <p><strong>Fecha y hora:</strong> {{ formatDate(transaccion.datetime) }}</p>

      <div v-if="isEditing" class="formulario-edicion">
        <h3>Editar Transacción</h3>
        <form @submit.prevent="actualizarTransaccion">
          <div>
            <label for="crypto_amount">Cantidad:</label>
            <input type="number" id="crypto_amount" v-model="transaccion.crypto_amount" step="any" required />
          </div>
          <div>
            <label for="money">Monto (ARS):</label>
            <input type="number" id="money" v-model="transaccion.money" step="any" required />
          </div>
          <button type="submit" class="btn-actualizar">Actualizar</button>
        </form>
      </div>

      <div v-else class="acciones">
        <button class="btn-editar" @click="iniciarEdicion">Editar</button>
        <button class="btn-volver" @click="volverAlHistorial">Volver</button>
      </div>
    </div>
  </div>
</template>

<script>
import apiAxios from '@/service/apiAxios';

export default {
  name: "EdicionYBorradoDeCompraYVentas",
  data() {
    return {
      transaccion: null,
      isEditing: false,
      error: '',
      transaccionId: '',
    };
  },
  created() {
    this.transaccionId = this.$route.params.id;
    this.obtenerTransaccion();
  },
  methods: {
    async obtenerTransaccion() {
      try {
        const response = await apiAxios.get(`/transactions/${this.transaccionId}`);
        this.transaccion = response.data;
      } catch (error) {
        this.error = 'Error al obtener los detalles de la transacción.';
        console.error(error);
      }
    },

    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleString();
    },

    iniciarEdicion() {
      this.isEditing = true;
    },

    async actualizarTransaccion() {
      try {
        const updatedData = {
          crypto_amount: this.transaccion.crypto_amount,
          money: this.transaccion.money,
        };

        const response = await apiAxios.patch(`/transactions/${this.transaccionId}`, updatedData);
        this.transaccion = response.data;
        this.isEditing = false;
        this.$router.push('/HistorialDeTransaccionesTatu');
      } catch (error) {
        this.error = 'Error al actualizar la transacción.';
        console.error(error);
      }
    },

    volverAlHistorial() {
      this.$router.push('/HistorialDeTransaccionesTatu');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

.transaccion {
  max-width: 700px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Anton', sans-serif;
  color: #222;
}

h2 {
  text-align: center;
  font-size: 26px;
  color: #27AE60;
  margin-bottom: 25px;
}

.detalle p {
  font-size: 16px;
  margin-bottom: 10px;
}

.formulario-edicion {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #222;
}

input {
  padding: 10px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  font-size: 14px;
}

button {
  padding: 10px 20px;
  font-family: 'Anton', sans-serif;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 14px;
}

.acciones {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.btn-editar {
  background-color: #F1C40F;
  color: #222;
}

.btn-editar:hover {
  background-color: #27AE60;
  color: #fff;
}

.btn-volver {
  background-color: #E74C3C;
  color: white;
}

.btn-volver:hover {
  background-color: #C0392B;
}

.btn-actualizar {
  background-color: #27AE60;
  color: white;
  width: 100%;
}

.btn-actualizar:hover {
  background-color: #219150;
}

.error {
  background-color: #ffdddd;
  color: red;
  padding: 10px;
  border: 1px solid red;
  border-radius: 6px;
  text-align: center;
  margin-bottom: 15px;
}

@media (max-width: 600px) {
  .transaccion {
    padding: 20px;
  }

  input {
    font-size: 14px;
  }

  .acciones {
    flex-direction: column;
  }
}
</style>
