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
        
        <div v-if="isEditing">
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
            <button type="submit">Actualizar</button>
          </form>
        </div>
  
        <div v-else>
          <button @click="iniciarEdicion">Editar</button>
          <button @click="borrarTransaccion">Borrar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '@/service/apiClient';
  
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
          const response = await apiClient.get(`/transactions/${this.transaccionId}`);
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
          
          const response = await apiClient.patch(`/transactions/${this.transaccionId}`, updatedData);
          this.transaccion = response.data; 
          this.isEditing = false;     
        } catch (error) {
          this.error = 'Error al actualizar la transacción.';
          console.error(error);
        }
      },
  
      async borrarTransaccion() {
        if (confirm('¿Estás seguro de que deseas borrar esta transacción?')) {
          try {
            await apiClient.delete(`/transactions/${this.transaccionId}`);
            this.$router.push('/historial'); 
          } catch (error) {
            this.error = 'Error al borrar la transacción.';
            console.error(error);
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .transaccion {
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
  
  .error {
    color: red;
    text-align: center;
  }
  
  .detalle {
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  form input {
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  