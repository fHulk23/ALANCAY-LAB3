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