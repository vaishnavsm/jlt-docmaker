<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">DocAssist</h1>
        <p>Automatic document creation using Data analytics and ML.</p>
      </div>
    </div>
    <div class="text-xs-center">
      <b-button pill variant="success" v-on:click="redirect('select-data')">Select CSV</b-button>
      <span> OR </span>
      <b-button pill variant="success" v-on:click="redirect('add-data')">Enter data</b-button>
    </div>
  </div>
</template>

<script>
import router from '../router';
export default {
  name: 'home',
  methods:{
    redirect: function (msg) {
      if (msg==='select-data')
        router.push({name: 'select-data'});
      else
        router.push({name: 'add-data'});
    }
  }
}
</script>