<template>
  <div class="analisis-inversiones">
    <h2>Análisis de Inversiones</h2>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <table v-if="Object.keys(investmentResults).length > 0">
      <thead>
        <tr>
          <th>Criptomoneda</th>
          <th>Resultado</th>
          <th>Total Comprado</th>
          <th>Total Vendido</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(result, crypto) in investmentResults" :key="crypto">
          <td>{{ crypto.toUpperCase() }}</td>
          <td :class="{'profit-positive': isProfitPositive(result.profit), 'profit-negative': !isProfitPositive(result.profit)}">{{ result.profit }}</td>
          <td>{{ result.totalPurchase }}</td>
          <td>{{ result.totalSales }}</td>
        </tr>
      </tbody>
    </table>

    <button class="btn-volver" @click="volverMenu()">Volver al Menú</button>
  </div>
</template>

<script>
import apiAxios from '@/service/apiAxios';
import { getCryptoValues } from '@/service/apiClient';

export default {
  name: "AnalisisDeInversion",
  data() {
    return {
      transactions: [],
      investmentResults: {},
      error: '',
    };
  },
  methods: {
    async fetchTransactions() {
      try {
        const userId = localStorage.getItem("user_id");
        const response = await apiAxios.get(`/transactions?q={"user_id": "` + userId + `"}`);
        this.transactions = response.data;
        await this.calculateInvestmentResults();
      } catch (error) {
        this.error = "Error al obtener las transacciones.";
        console.error("Error fetching transactions:", error);
      }
    },
    async getCurrentPrice(cryptoCode) {
      try {
        const response = await getCryptoValues(cryptoCode);
        return response.ask;
      } catch (error) {
        console.error(`Error fetching price for ${cryptoCode}:`, error);
        return 0;
      }
    },
    async calculateInvestmentResults() {
      const cryptoData = {};
      this.investmentResults = {};

      this.transactions.forEach((transaction) => {
        const { crypto_code, crypto_amount, money, action } = transaction;

        if (!cryptoData[crypto_code]) {
          cryptoData[crypto_code] = {
            purchases: [],
            sales: [],
          };
        }

        if (action === "purchase") {
          cryptoData[crypto_code].purchases.push({ amount: parseFloat(crypto_amount), price: parseFloat(money) });
        } else if (action === "sale") {
          cryptoData[crypto_code].sales.push({ amount: parseFloat(crypto_amount), price: parseFloat(money) });
        }
      });

      for (const cryptoCode in cryptoData) {
        const { purchases, sales } = cryptoData[cryptoCode];
        const currentPrice = await this.getCurrentPrice(cryptoCode);

        const totalPurchase = purchases.reduce((sum, p) => sum + p.price, 0);
        const totalSales = sales.reduce((sum, s) => sum + s.price, 0);

        const totalAmountOwned = purchases.reduce((sum, p) => sum + p.amount, 0) - sales.reduce((sum, s) => sum + s.amount, 0);
        const currentValue = totalAmountOwned * currentPrice;

        const profitRaw = currentValue - totalPurchase;

        this.investmentResults[cryptoCode] = {
          profit: this.formatearDinero(profitRaw),
          totalPurchase: this.formatearDinero(totalPurchase),
          totalSales: this.formatearDinero(totalSales),
          profitRaw,
        };
      }
    },
    formatearDinero(cantidad) {
      return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(cantidad);
    },
    isProfitPositive(profitFormatted) {
      // profitFormatted comes with currency symbol, so we check the raw value instead
      return this.investmentResults && Object.values(this.investmentResults).some(p => p.profit === profitFormatted && p.profitRaw >= 0);
    },
    volverMenu() {
      this.$router.push('/Menuprincipal');
    },
  },
  mounted() {
    this.fetchTransactions();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

.analisis-inversiones {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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

.profit-positive {
  color: #27AE60;
  font-weight: bold;
}

.profit-negative {
  color: #E74C3C;
  font-weight: bold;
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
  display: block;
  margin: 0 auto;
}

.btn-volver:hover {
  background-color: #c0392b;
}

@media (max-width: 600px) {
  .analisis-inversiones {
    padding: 20px;
  }

  th, td {
    font-size: 14px;
  }
}
</style>
