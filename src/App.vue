

<script>
// import infinite scroll
import Post from "./components/MyPost.vue";

export default {
  name: "App",
  data() {
    return {
      movie_list: [],
      current_tab: "home-page"
      // Declare as many ever maps that you want for bookkeeping
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

    //  function getCurrentUserID() {
    //    //if the cookie is empty
    //    // if empty fabircate and id and set in cooke
    //    //return from cookie UUID
    // https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
    //   }

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
      const movies = await fetch("http://localhost:3000/home-page", {}).then((response) => (response.json()))

      const options = {
        root: null,
        threshold: [0.5],
      };
      /*eslint-disable */
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(
              `Post with title ` + entry.target.getAttribute("id") + `is now visible.` 
            );

            // entry.target.getAttribute("id") will give you the movie id

            // for the first call of a movie id, start a time
            // for the second call of a movie id do an api call to the backend and stop the timer
            // for the third call start the timer again.
            // type ScrollDataCaptured struct {
            //     UserID           string    `json:"user_id"`
            //     Timestamp        time.Time `json:"timestamp"`
            //     DurationOfScroll int       `json:"duration_of_scroll"`
            //     PostID           string    `json:"post_id"`
            //   }

            // Userid fabricated or it comes from cookie
            // timestamp is time.now
            // duration of scroll based on difference
            // postid - entry.target.getAttribute("id")
            
          } else {
            console.log(
              `Post with title ` + entry.target.getAttribute("id") + `is now visible.`
            );
          }
        });
      }, options);

      // Observe all posts

      setTimeout(async () => {

        movies.forEach((movie) => {
          const post = document.getElementById(movie.movie_id);
          console.log("Posts,movie",post,movie.movie_id)
          observer.observe(post);
        });
      }, 2000);

      // movies.forEach((movie) => {
      //       const post = document.getElementById(`#${movie.movie_id}`);
      //       observer.observe(post);
      //     });
      // movies.forEach((movie) => {
      //   const post = document.getElementById(`#${movie.movie_id}`);
      //   observer.observe(post);
      // });

      return movies
    },

    handleScroll() {

      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 50
      ) {
        this.getMovies().then((response) => {
          this.movie_list = [...this.movie_list, ...response]
        });
      }
    },
  },

  mounted() {
    this.movie_list = this.getMovies().then((response) => {
      console.log("checking on first init", response)
      this.movie_list = response
    });
    window.addEventListener("scroll", this.handleScroll); // if scroll, then function handleScroll() works automatically.
  },
};
</script>

<template>
  <header class="sticky">
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
      <Post v-for="(movie, i) in movie_list" :key="i" :movie="movie" class="post" />
    </div>
  </div>

  <!-- Bootstrap -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</template>

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
  position: fixed;

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
