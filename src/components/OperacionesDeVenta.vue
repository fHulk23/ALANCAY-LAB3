<template>
    <div class ="OperacionesDeventa">
      <h2>Operaciones de Venta de Criptomonedas</h2>
      <form @submit.prevent="operacionVenta" class="transaccion-ventas">
        <div>
          <label for="cripto">Criptomonedas:</label>
          <select v-model="cripto" required>
            <option value="usdc">USDC</option>
            <option value="btc">Bitcoin</option>
            <option value="eth">Ethereum</option>
          </select>
        </div>
  
        <div>
          <label for="cantidadcripto">Cantidad</label>
          <input type="number" v-model="cantidadcripto" step="0.0001" required />
        </div>
  
        <div>
          <label for="fecha">Fecha</label>
          <input type="datetime-local" v-model="fecha" required />
        </div>
  
        <div>
          <label for="importe">Ingrese importe $ :</label>
          <input type="number" v-model="importe" step="0.01any" required />
        </div>
  
        <button type="submit" class="boton-operacionVenta">Venta</button>
      </form>
    </div>
  </template>
  
  <script>
import apiAxios from '@/service/apiAxios';

  export default { 
    name: "OperacionesDeVenta",    
    data() {
      return {
        cripto: "btc",
        cantidadcripto: null,
        fecha: '',
        importe: null,
        operacionVenta: "venta",
      };
    },
    methods: {
      async operacionVentas() {
        if (this.cantidadcripto > 0 && this.importe > 0) {
          alert("La cantidad y el monto deben ser mayores a 0.");
          return;
        }
  
        const userId = localStorage.getItem("user_id");
  
        const transactionData = {
          user_id: userId,
          action: this.operacionVenta,
          crypto_code: this.cripto,
          crypto_amount: parseFloat(this.cantidadcripto).toFixed(2),
          money: parseFloat(this.importe).toFixed(2),
          datetime: this.fecha,
        };
  
        try {
          const response = await apiAxios.post('/transactions', transactionData);
          if (response.status === 200) {
            alert("Transacción registrada exitosamente.");
            this.clearForm();
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
  </style>