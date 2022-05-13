<script setup lang="ts">
import Animation from './components/Animation.vue';
import SearchBar from './components/SearchBar.vue';
import communes from './../communes.json';

console.log(communes);

</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <SearchBar />
  <Animation msg="" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
