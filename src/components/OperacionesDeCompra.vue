<template>
  <div class="OperacionesDeCompra">
    <h2>Operacion compra de Cripto</h2>
    
    <form @submit.prevent="submitForm">
      <div>
        <label for="cripto">Criptomoneda:</label>
        <select v-model="form.cripto" required>
          <option disabled value="">Seleccionar criptomoneda</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="usdc">USDC</option>
          <option value="ethereum">Ethereum</option>
        </select>
      </div>

      <div>
        <label for="cantidadcripto">Cantidad comprada</label>
        <input type="number" v-model="form.cantidadcripto" step="any" required min="0.00001" />
      </div>

      <div>
        <label for="importe">Monto en Pesos</label>
        <input type="number" v-model="form.importe" required min="0.01" />
      </div>

      <div>
        <label for="fecha">Fecha y hora</label>
        <input type="datetime-local" v-model="form.fecha" required />
      </div>

      <button type="submit" class="boton-operacionCompra">Compra</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">Compra guardada correctamente</p>
  </div>
</template>

<script>
import apiAxios from '@/service/apiAxios';

export default {
  name: "OperacionesDeCompra",
  data() {
    return {
      form: {
        cripto: '',
        cantidadcripto: null,
        importe: null,
        fecha: '',
      },
      error: "",
      success: false,
    };
  },
  methods: {
    async submitForm() {
      this.error = "";
      this.success = false;

      if (!this.form.cripto || this.form.cantidadcripto <= 0 || this.form.importe <= 0 || !this.form.fecha) {
        this.error = "Todos los campos deben ser válidos.";
        return;
      }

      try {
        const user_id = "valor_introducido_login";
        const transaction = {
          user_id,
          action: "purchase",
          cripto: this.form.cripto,
          cantidad: this.form.cantidadcripto,
          importe: this.form.importe,
          fecha: this.form.fecha,
        };

        const response = await apiAxios.post('/transactions', transaction)

        if (response.status === 200) {
          this.success = true;
          this.form = { cripto: '', cantidadcripto: null, importe: null, fecha: '' };
        } else {
          this.error = "Hubo un error al guardar la compra.";
        }
      } catch (error) {
        this.error = "No se pudo conectar con el servidor.";
      }
    },
  },
};
</script>

<style scoped>
.Operacion {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
