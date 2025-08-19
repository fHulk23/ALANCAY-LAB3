<template>
    <div class="estado-financiero">
      <h2>Estado Actual de Mis Finanzas</h2>
  
      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
  
      <div v-if="cryptos.length > 0">
        <table>
          <thead>
            <tr>
              <th>Criptomoneda</th>
              <th>Cantidad</th>
              <th>Dinero (ARS)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(crypto, index) in cryptos" :key="index">
              <td>{{ crypto.name }}</td>
              <td>{{ crypto.amount }}</td>
              <td>{{ crypto.money }}</td>
            </tr>
          </tbody>
        </table>
  
        <div class="total">
          <p><strong>Total: </strong>{{ totalMoney }} ARS</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiAxios  from '@/service/apiAxios';
  import { getCryptoValues } from '@/service/apiClient';
  
  export default {
    name: "EstadoActualizado",
    data() {
      return {
        cryptos: [],    
        totalMoney: 0,    
        error: '',
      };
    },
    created() {
      this.obtenerTransacciones();
    },
    methods: {
      async obtenerTransacciones() {
        try {
          const userId = localStorage.getItem("user_id");
          const response = (await apiAxios.get(`/transactions?q={"user_id": "`+userId+`"}`)).data;

          const groupedCryptos = this.agruparTransacciones(response);

          for (const cryptoCode in groupedCryptos) {
            const totalAmount = groupedCryptos[cryptoCode].amount;
            const currentPrice = await this.obtenerPrecioCrypto(cryptoCode);
            const totalMoney = totalAmount * currentPrice;
            this.totalMoney += totalMoney;
            this.cryptos.push({
              name: cryptoCode.toUpperCase(),
              amount: this.formatearDinero(totalAmount),
              money: this.formatearDinero(totalMoney),
            });
          }
  
          this.totalMoney = this.formatearDinero(this.totalMoney);
          
        } catch (error) {
          this.error = 'Hubo un error al obtener las transacciones o el precio de las criptomonedas.';
          console.error(error);
        }
      },
  
      agruparTransacciones(transacciones) {
        const cryptos = {};
        
        transacciones.forEach((transaccion) => {
          const cryptoCode = transaccion.crypto_code;
          const amount = parseFloat(transaccion.crypto_amount);
          const money = parseFloat(transaccion.money);
  
          if (!cryptos[cryptoCode]) {
            cryptos[cryptoCode] = { amount: 0, money: 0 };
          }
  
          if (transaccion.action === 'purchase') {
            cryptos[cryptoCode].amount += amount;
            cryptos[cryptoCode].money += money;
          } else if (transaccion.action === 'sale') {
            cryptos[cryptoCode].amount -= amount;
            cryptos[cryptoCode].money -= money;
          }
        });
  
        for (const cryptoCode in cryptos) {
          if (cryptos[cryptoCode].amount === 0) {
            delete cryptos[cryptoCode];
          }
        }
  
        return cryptos;
      },
  
      async obtenerPrecioCrypto(cryptoCode) {
        try {
          const response = await getCryptoValues(cryptoCode);
          return response.ask;
        } catch (error) {
          console.error(`Error al obtener el precio de ${cryptoCode}:`, error);
          return 0;
        }
      },
  
      formatearDinero(cantidad) {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(cantidad);
      },
    },
  };
  </script>
  
  <style scoped>
  .estado-financiero {
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
  
  table {
    width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
  }
  
  table th, table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .total {
    font-weight: bold;
    text-align: right;
  }
  </style>
  