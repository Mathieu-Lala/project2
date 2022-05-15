<script setup lang="ts">
import Animation from './components/Animation.vue';
import SearchBar from './components/SearchBar.vue';
import communes from './../communes.json';
import CommuneEntry from './data/CommuneEntry';

let communes2 = communes.map(c => new CommuneEntry(c.nom_commune));

</script>
<template>
  <!--<img alt="Vue logo" src="./assets/logo.png" />-->
  <SearchBar :communes="communes2" />
  <div id="pixi-layer"></div>
  <Animation />
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

#pixi-layer {
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: block;
  position: relative;
  z-index: -1;
  background: fixed;
}
</style>
