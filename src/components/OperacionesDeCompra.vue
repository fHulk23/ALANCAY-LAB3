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
           <button @click="volverMenu()" style="background-color: blue; margin-top: 10px;">Volver al Menú</button>
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
        const userId = localStorage.getItem("user_id");

        const transaction = {
          user_id: userId,
          action: "purchase",
          crypto_code: this.form.cripto,
          crypto_amount: this.form.cantidadcripto,
          money: this.form.importe,
          datetime: this.form.fecha,
        };

        const response = await apiAxios.post('/transactions', transaction)

        if (response.data != null) {
          this.success = true;
          this.form = { cripto: '', cantidadcripto: null, importe: null, fecha: '' };
          this.$router.push('/Menuprincipal');
        } else {
          this.error = "Hubo un error al guardar la compra.";
        }
      } catch (error) {
        this.error = "No se pudo conectar con el servidor.";
      }
    },
    volverMenu(){
      this.$router.push('/Menuprincipal');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

.OperacionesDeCompra {
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Anton', sans-serif;
  color: #222222;
}

h2 {
  color: #27AE60; /* Verde billete */
  margin-bottom: 25px;
  font-size: 24px;
  text-align: center;
}

form div {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 16px;
  color: #333333;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 2px solid #27AE60;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus, select:focus {
  border-color: #F1C40F; /* Amarillo */
}

.boton-operacionCompra {
  width: 100%;
  background-color: #F1C40F; /* Amarillo */
  color: #222222;
  font-weight: bold;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.boton-operacionCompra:hover {
  background-color: #27AE60; /* Verde */
  color: #ffffff;
  transform: scale(1.02);
}

.error {
  color: red;
  margin-top: 15px;
  font-size: 14px;
  text-align: center;
}

.success {
  color: #27AE60;
  margin-top: 15px;
  font-size: 14px;
  text-align: center;
}

button:last-of-type {
  margin-top: 20px;
  background-color: #27AE60;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:last-of-type:hover {
  background-color: #F1C40F;
  color: #222222;
  transform: scale(1.02);
}

@media (max-width: 600px) {
  .OperacionesDeCompra {
    padding: 20px;
    margin: 20px;
  }

  h2 {
    font-size: 20px;
  }
}
</style>
