<template>
    <div class ="OperacionesDeventa">
      <h2>Operaciones de Venta de Criptomonedas</h2>
      <form @submit.prevent="operacionVentas" class="transaccion-ventas">
        <div>
          <label for="cripto">Criptomonedas:</label>
          <select v-model="form.cripto" required>
            <option value="usdc">USDC</option>
            <option value="btc">Bitcoin</option>
            <option value="eth">Ethereum</option>
          </select>
        </div>
  
        <div>
          <label for="cantidadcripto">Cantidad</label>
          <input type="number" v-model="form.cantidadcripto" step="0.0001" required />
        </div>
  
        <div>
          <label for="fecha">Fecha</label>
          <input type="datetime-local" v-model="form.fecha" required />
        </div>
  
        <div>
          <label for="importe">Ingrese importe $ :</label>
          <input type="number" v-model="form.importe" step="0.01any" required />
        </div>
  
        <button type="submit" class="boton-operacionVenta">Vender</button>
      </form>
       <button @click="volverMenu()" style="background-color: blue; margin-top: 10px;">Volver al Menú</button>
    </div>
  </template>
  
  <script>
import apiAxios from '@/service/apiAxios';

  export default { 
    name: "OperacionesDeVenta",    
    data() {
      return {
        form: {
          cripto: '',
          cantidadcripto: null,
          importe: null,
          fecha: '',
          operacionVenta: "sale",
        },
      };
    },
    methods: {
      async operacionVentas() {
        if (this.form.cantidadcripto <= 0 && this.form.importe <= 0) {
          alert("La cantidad y el monto deben ser mayores a 0.");
          return;
        }
  
        const userId = localStorage.getItem("user_id");
  
        const transactionData = {
          user_id: userId,
          action: this.form.operacionVenta,
          crypto_code: this.form.cripto,
          crypto_amount: this.form.cantidadcripto,
          money: this.form.importe,
          datetime: this.form.fecha,
        };
  
        try {
          const response = await apiAxios.post('/transactions', transactionData);
          if (response.data != null) {
            alert("Transacción registrada exitosamente.");
            this.clearForm();
            this.$router.push('/Menuprincipal');
          } else {
            alert("Hubo un error al registrar la transacción.");
          }
        } catch (error) {
          console.error("Error al registrar la transacción:", error);
          alert("Ocurrió un error en la solicitud.");
        }
      },
      clearForm() {
        this.cantidadcripto = "";
        this.importe= "";
        this.fecha = new Date().toISOString().slice(0, 16); 
        this.cripto = "btc";
      },
      volverMenu(){
      this.$router.push('/Menuprincipal');
    },
    },
  };
  </script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

.OperacionesDeventa {
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
  color: #27AE60;
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
  border-color: #F1C40F;
}

.boton-operacionVenta {
  width: 100%;
  background-color: #F1C40F;
  color: #222222;
  font-weight: bold;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.boton-operacionVenta:hover {
  background-color: #27AE60;
  color: #ffffff;
  transform: scale(1.02);
}

button:last-of-type {
  margin-top: 20px;
  width: 100%;
  background-color: #27AE60;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:last-of-type:hover {
  background-color: #F1C40F;
  color: #222222;
  transform: scale(1.02);
}

@media (max-width: 600px) {
  .OperacionesDeventa {
    padding: 20px;
    margin: 20px;
  }

  h2 {
    font-size: 20px;
  }
}
</style>
