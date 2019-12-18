<template>
  <div id="app">
    <TheHeader />
    <router-view></router-view>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";

export default {
  name: 'app',
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style>
  .p, .b-button {
    font-family: 'Work Sans', sans-serif;
  }
</style>
