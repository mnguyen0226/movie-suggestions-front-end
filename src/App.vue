<template>
	<div>
		<header>
			<h1>My Movies Feed</h1>
		</header>
		<main>
      <!-- Create articles -->
			<Post v-for="(movie, i) in movie_list" :key="i" :movie="movie" />
		</main>
	</div>
</template>

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
			if (
				window.scrollY + window.innerHeight >=
				document.body.scrollHeight - 50
			) {
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
</style>
