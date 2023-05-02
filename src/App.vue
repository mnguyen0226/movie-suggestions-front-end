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

    notifyEvent(post_id, time_diff, user_id, now_time) {
      console.log("Notify Event Call: " + post_id + " TD: " + time_diff + " UI: " + user_id + " NT: " + now_time)
      // record-scroll
      const url = 'http://localhost:3000/record-scroll';

      function formatTimeZoneOffset(offset) {
        const sign = offset < 0 ? '+' : '-';
        const absOffset = Math.abs(offset);
        const hours = Math.floor(absOffset / 60);
        const minutes = absOffset % 60;
        return `${sign}${padNumber(hours)}:${padNumber(minutes)}`;
      }

      function padNumber(number) {
        return number.toString().padStart(2, '0');
      }

      const date = new Date();

      const rfc3339String = date.toISOString().replace('Z', formatTimeZoneOffset(date.getTimezoneOffset()));

      const data = {
        user_id: user_id,
        timestamp: rfc3339String,
        duration_of_scroll: time_diff,
        post_id: post_id
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Successfully notified:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },

    fetch_api(mode) {
      this.movie_list = []
      this.current_tab = mode

      // get movie
      this.getMovies().then((response) => {
        this.movie_list = [...this.movie_list, ...response]
      });
    },

    async getMovies() {
      var url = ""
      var page_limit = 8

      console.log(this.movie_list.length)
      var requested_pn = Math.floor(this.movie_list.length / page_limit) + 1
      if (this.current_tab == "home-page") {
        url = "http://localhost:3000/home-page?page="+requested_pn+"&limit="+page_limit
      }
      else if (this.current_tab == "suggestion-page") {
        url = "http://localhost:3000/suggestion-page?page="+requested_pn+"&limit="+page_limit+"&userid=" + this.getCurrentUserID()
      }
      else if (this.current_tab == "trending-page") {
        url = "http://localhost:3000/trending-page?page="+requested_pn+"&limit="+page_limit
      }
      console.log('getMovie() Call')
      const movies = await fetch(url, {}).then((response) => (response.json()))

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
          if (!(post_id in this.post_call_bk)) {
            this.post_call_bk[post_id] = {
              state: false,
              timestamp: null,
            }
          }

          // check state and replace
          curr_ele_state = this.post_call_bk[post_id]

          if (!(curr_ele_state.state)) {
            curr_ele_state.state = true
            curr_ele_state.timestamp = Date.now()
          } else {
            curr_ele_state.state = false
            var diff = Date.now() - curr_ele_state.timestamp
            curr_ele_state.timestamp == null


            // call api
            this.notifyEvent(post_id, diff, this.getCurrentUserID(), Date.now())
          }
          this.post_call_bk[post_id] = curr_ele_state

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
  <header class="sticky header-style">
    <h1>Scrollflix</h1>
  </header>
  <br/>
  <br/>

  <div class="parent">

    <div class="item-left sidebar-style" style="color:black; text-align: center;">
      &nbsp;
      <div class="btn-group-vertical">
        <button type="button" class="btn btn-light rounded" @click="fetch_api('home-page')">All Movies</button>
        &nbsp;
        <button type="button" class="btn btn-light rounded" @click="fetch_api('suggestion-page')">Recommended
          Movies</button>
        &nbsp;
        <button type="button" class="btn btn-light rounded" @click="fetch_api('trending-page')">Most-watched +
          Stakeholder-paid Movies</button>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div>
        <p style="color:white; font-size: 2em; font-style: italic;" class="special-font">
          Movie suggestion at your finger tip!
        </p>
      </div>  
      <br/>    
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <p style="color:white; font-size: 1.5em;"><strong>Scrollflix</strong></p>
      <div>
        <i class="fab fa-youtube" style="color:white; font-size: 1.5em"></i>
        &nbsp;
        &nbsp;
        &nbsp;
        <i class="fab fa-tiktok" style="color:white; font-size: 1.5em"></i>
        &nbsp;
        &nbsp;
        &nbsp;
        <i class="fab fa-facebook" style="color:white; font-size: 1.5em"></i>
      </div>
      <br/>
      <div>
        <p style="color:white; font-size: 1em;">Contact | Careers | Direction</p>
      </div>
      <div>
        <p style="color:white; font-size: 1em;">Copyright &copy; 2023. All Rights Reserved.</p>
      </div>
    </div>

    <div class="item-right last mainbar-style" style="text-align: center;">
      <Post v-for="(movie, i) in movie_list" :key="i" :movie="movie" class="post" />
    </div>
  </div>

  <!-- Bootstrap -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
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

  background-color: white;
  color: black;
  border: 2px solid blue;
  border-radius: 5px;
  padding: 10px 20px;
}

.btn-group button:active {
  background-color: blue;
  color: white;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%
}

.header-style {
  background-color: black;
  color: red;
  padding: 1.2em;
  border-bottom: 2px solid white;
}

.sidebar-style {
  background-color: black;
  color: white;
  border-right: 2px solid white;
}

.mainbar-style {
  background-color: black;
  color: white;
}

.sidebar-pos {
  position: relative;
}

.sidebar-footer-pos {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
}

@import url('https://fonts.googleapis.com/css?family=Dancing+Script&display=swap');

.special-font {
  font-family: 'Dancing Script', cursive;
  font-size: 2em;
}
</style>


