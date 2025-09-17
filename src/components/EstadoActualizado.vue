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
            <th>Valor (ARS)</th>
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
        <p><strong>Total: </strong>{{ totalMoney }}</p>
      </div>
    </div>

    <button class="btn-volver" @click="volverMenu()">Volver al Menú</button>
  </div>
</template>

<script>
import apiAxios from '@/service/apiAxios';
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
        const response = (await apiAxios.get(`/transactions?q={"user_id": "` + userId + `"}`)).data;

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

    volverMenu() {
      this.$router.push('/Menuprincipal');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

.estado-financiero {
  max-width: 800px;
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
  color: #27AE60;
  margin-bottom: 25px;
  font-size: 26px;
}

.error {
  background-color: #ffecec;
  color: #e74c3c;
  padding: 10px;
  border: 1px solid #e74c3c;
  border-radius: 6px;
  text-align: center;
  margin-bottom: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th {
  background-color: #F1C40F;
  color: #222;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
}

td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.total {
  text-align: right;
  font-size: 18px;
  color: #27AE60;
  margin-top: 20px;
}

.btn-volver {
  padding: 10px 20px;
  background-color: #E74C3C;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Anton', sans-serif;
  transition: 0.3s;
}

.btn-volver:hover {
  background-color: #c0392b;
}

@media (max-width: 600px) {
  .estado-financiero {
    padding: 20px;
  }

  th, td {
    font-size: 14px;
  }

  .total {
    font-size: 16px;
  }
}
</style>
