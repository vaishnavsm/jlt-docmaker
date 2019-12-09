<template>
  <div class="hello">
    <button>Select Data</button>
    <h3>OR</h3>
    <button v-on:click="redirect">Enter key value pairs</button>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  props: {
  },
  methods:{
    redirect: function() {
      this.$router.push('manually_enter');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
