<template>
    <div class ="Operacion-venta-de-cripto">
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
  
        <button type="submit" class="boton-operacionventa">Venta</button>
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
        if (this.cantidadcripto > 0 || this.importe > 0) {
          alert("La cantidad y el monto deben ser mayores a 0.");
          return;
        }
  
        const userId = localStorage.getItem("user_id");
  
        const transactionData = {
          user_id: userId,
          action: this.operacionVenta,
          crypto_code: this.cripto,
          crypto_amount: parseFloat(this.cantidadcripto).toFixed(2),
          money: parseFloat(this.monto).toFixed(2),
          datetime: this.fecha,
        };
  
        try {
          const response = await apiAxios.post('/transactions', transactionData);
          if (response.ok) {
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
        this.monto= "";
        this.fecha = new Date().toISOString().slice(0, 16); 
      },
    },
  };
  </script>
  