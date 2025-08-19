import { createRouter, createWebHistory } from 'vue-router';

import AnalisisDeInversion from '@/components/AnalisisDeInversion.vue';
import EdicionYBorradoDeCompraYVentas from '@/components/EdicionYBorradoDeCompraYVentas.vue';
import Estadoactualizado from '@/components/EstadoActualizado.vue';
import HistorialDeTransaccionesTatu from '@/components/HistorialDeTransaccionesTatu.vue';
import LoginUsuario from '@/components/LoginUsuario.vue';
import Menuprincipal from '@/components/MenuPrincipal.vue';
import OperacionesdeCompra from '@/components/OperacionesDeCompra.vue';
import OperacionesdeVenta from '@/components/OperacionesDeVenta.vue';

const routes = [
    {
      path: '/Menuprincipal',
      name: 'Menuprincipal',
      component: Menuprincipal,
    },
    {
      path: '/',
      name: 'IniciarSesion',
      component: LoginUsuario,
    },
    {
      path: '/OperacionesdeVenta',
      name: 'OperacionesdeVenta',
      component: OperacionesdeVenta,
    },
    {
      path: '/OperacionesdeCompra',
      name: 'OperacionesdeCompra',
      component: OperacionesdeCompra,
    },
    {
      path: '/HistorialDeTransaccionestatu',
      name: 'HistorialDeTransaccionestatu',
      component: HistorialDeTransaccionesTatu,
    },
    {
      path: '/EstadoActualizado',
      name: 'EstadoActualizado',
      component: Estadoactualizado,
    },
    {
        path: '/Edicionyborradodecomprayventas/:id',
        name: 'editarMovimiento',
        component: EdicionYBorradoDeCompraYVentas,
      },
    {
      path: '/AnalisisDeInversion',
      name: 'AnalisisDeInversion',
      component: AnalisisDeInversion
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });
  
  export default router;