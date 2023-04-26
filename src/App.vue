

<script>
// import infinite scroll
import Post from "./components/MyPost.vue";

export default {
	name: "App",
	data() {
		return {
			movie_list: [],
		};
	},
	components: {
		Post,
	},
	methods: {
		getMovie() {
			const movie_titles = [
				"Naruto",
				"Demon Slayer",
				"Dragon Ball",
				"My Hero Academia",
				"Sword Art Online",
				"Tokyo Ghoul",
				"Darling in the Franxx",
				"Code Geass",
				"One Piece",
				"Fairy Tail",
				"Bleach",
				"Attack on Titan",
				"Hunter x Hunter",
			];

			const movie = [];

			for (let i = 0; i < 10; i++) {
				movie.push({
					title: movie_titles[
						Math.floor(Math.random() * movie_titles.length)
					],
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				});
			}

			return movie;
		},

    async getMovies() {
      const movies = await fetch("http://localhost:3000/home-page", {}).then((response)=>(response.json()))
      return movies
    },

		handleScroll() {
      console.log("Window Size:", window.scrollY + window.innerHeight);
      console.log("Threshold: ", document.body.scrollHeight - 50)
			if (
				window.scrollY + window.innerHeight >=
				document.body.scrollHeight - 50
			) {
        console.log("activate")
        this.getMovies().then((response)=>{
          console.log(response)
          this.movie_list = [...this.movie_list, ...response]
        });
			}
		},
	},

	mounted() {
		this.movie_list = this.getMovies().then((response)=>{
      console.log("checking on first init",response)
      this.movie_list = response
    });
		window.addEventListener("scroll", this.handleScroll); // if scroll, then function handleScroll() works automatically.
	},
};
</script>

<template>
  <header>
    <h1>My Home Page</h1>
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
      <Post v-for="(movie, i) in movie_list" :key="i" :movie="movie" />
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
  padding: 2em;
  color: #ffffff;
  background: #eeeeee;
  min-height: 500px;
}

.item-right {
  width: 75%;
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

</style>
