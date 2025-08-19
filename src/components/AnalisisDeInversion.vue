<template>
  <div>
    <h1>Análisis de Inversiones</h1>
    <table>
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
          <td>{{ crypto }}</td>
          <td>{{ result.profit }}</td>
          <td>{{ result.totalPurchase }}</td>
          <td>{{ result.totalSales }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import apiAxios  from '@/service/apiAxios';
import { getCryptoValues } from '@/service/apiClient';

export default {
  name: "AnalisisDeInversion",
  data() {
    return {
      transactions: [],
      investmentResults: {},
    };
  },
  methods: {
    async fetchTransactions() {
      try {
        const userId = localStorage.getItem("user_id");

        const response = await apiAxios.get(`/transactions?q={"user_id": "`+userId+`"}`);
        this.transactions = response.data;
        this.calculateInvestmentResults();
      } catch (error) {
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

        const totalPurchase = purchases.reduce((sum, purchase) => sum + purchase.amount * purchase.price, 0);

        const totalSales = sales.reduce((sum, sale) => sum + sale.amount * sale.price, 0);

        const totalAmountOwned = purchases.reduce((sum, purchase) => sum + purchase.amount, 0) - sales.reduce((sum, sale) => sum + sale.amount, 0);
        const currentValue = totalAmountOwned * currentPrice;

        const profit = currentValue - totalPurchase;

        this.investmentResults[cryptoCode] = {
          profit: this.formatearDinero(profit),
          totalPurchase: this.formatearDinero(totalPurchase),
          totalSales: this.formatearDinero(totalSales),
        };
      }
    },
    formatearDinero(cantidad) {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(cantidad);
    },
  },
  mounted() {
    this.fetchTransactions();
  },
  
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black;
}

th, td {
  padding: 8px;
  text-align: left;
}
</style>
