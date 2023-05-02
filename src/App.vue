

<script>
import Post from "./components/MyPost.vue";

export default {
  name: "App",
  data() {
    return {
      movie_list: [],
      current_tab: "home-page",
      post_call_bk: {}, // book keeping
    };
  },
  components: {
    Post,
  },
  methods: {
    getCurrentUserID() {
      if (!localStorage.getItem('userID')) { // Check if the localStorage item is empty
        let uuid = this.generateUUID(); // Generate a new UUID
        localStorage.setItem('userID', uuid); // Set the new UUID in localStorage
        return uuid; // Return the new UUID
      } else {
        return localStorage.getItem('userID'); // Return the UUID from localStorage
      }
    },

    generateUUID() {
      let d = new Date().getTime();
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    },

    notifyEvent(post_id, time_diff, user_id, now_time){
      console.log("Notify Event Call: " + post_id + " TD: " +  time_diff + " UI: " + user_id + " NT: "+ now_time)
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
          var post_id = entry.target.getAttribute("id")
          var curr_ele_state = {}

          // first call check if there is entry, initialize
          if (!(post_id in this.post_call_bk)){
            this.post_call_bk[post_id] = {
              state: false,
              timestamp: null,
            }
          } 
          
          // check state and replace
          curr_ele_state = this.post_call_bk[post_id]

          if (!(curr_ele_state.state)){
            curr_ele_state.state = true
            curr_ele_state.timestamp = Date.now()
          } else {
            curr_ele_state.state = false
            var diff = Date.now() - curr_ele_state.timestamp
            curr_ele_state.timestamp == null


            // call api
            this.notifyEvent(post_id,diff,this.getCurrentUserID(), Date.now())
          }
          this.post_call_bk[post_id]=curr_ele_state

        });
        console.log("Movie ID List: " + this.movie_id_list);
      }, options);

      // Observe all posts

      setTimeout(async () => {

        movies.forEach((movie) => {
          const post = document.getElementById(movie.movie_id);
          console.log("Posts,movie", post, movie.movie_id)
          observer.observe(post);
        });
      }, 2000);

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
