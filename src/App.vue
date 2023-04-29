

<script setup>
// import infinite scroll
import Post from "./components/MyPost.vue";
import { useMovieStore } from "@/stores/movieStore";

import { onMounted } from 'vue'


const movieStore=useMovieStore();

async function handleScroll() {
      console.log("Window Size:", window.scrollY + window.innerHeight);
      console.log("Threshold: ", document.body.scrollHeight - 50)
			if (
				window.scrollY + window.innerHeight >=
				document.body.scrollHeight - 50
			) {
        console.log("activate")
        await movieStore.fetchMovies();
			}
    }

onMounted(async () => {
  await movieStore.fetchMovies();
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="sticky">
    <h1 >My Home Page</h1>
  </header>

  <div class="parent">

    <div class="item-left" style="color:black; text-align: center;">
      <h2>Select Recommendation Systems</h2>
      &nbsp;
      <div class="btn-group-vertical">
        <button type="button" class="btn btn-primary rounded">All Movies</button>
        &nbsp;
        <button type="button" class="btn btn-secondary rounded">Recommended Movies</button>
        &nbsp;
        <button type="button" class="btn btn-secondary rounded">Most-watched + Stakeholder-paid Movies</button>
      </div>
    </div>
    
    <div class="item-right last" style="text-align: center;">
      <h2>Select Movies</h2>
      &nbsp;
      <Post v-for="(movie, i) in movieStore.getMovies" :key="i" :movie="movie" />
    </div>
  </div>

  <!-- Bootstrap -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"></template>

<style>
* {
	margin: 0;
	box-sizing: border-box;
}

body {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #fff;
	background-color: #2c3e50;
	min-height: 100vh;
	padding-top: 3rem;
}

header h1 {
	text-align: center;
}

header {
	margin-bottom: 2rem;
}

main {
	padding: 0 2rem;
	max-width: 640px;
	margin: 0 auto;
}

.parent {
  display: flex;
  font-family: arial, sans-serif;
}

.item-left {
  width: 25%;
  height: 100%;
  position:fixed;

  padding: 2em;
  color: #ffffff;
  background: #eeeeee;
  min-height: 500px;
}

.item-right {
  width: 65%;
  flex: 1;
  margin-left: 25%;

  
  padding: 2em;
  color: #ffffff;
  background: #eeeeee;
  min-height: 500px;
}

.last {
  color: #222;
  background: #ccc;
}

.btn-group button {
  display: block;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%
}
</style>
