import { defineStore } from "pinia";

export const useMovieStore = defineStore("CartStore", {
    state: () => {
        // eslint-disable-next-line
        movie_list: []
    },
    getters: {
       getMovies(){
            return this.movie_list;
        }
    },
    actions: {
        async fetchMovies() {
            console.log("Called here")
            this.movie_list =await fetch("http://localhost:3000/home-page").then((response)=>response.json())
            console.log(this.movie_list)
            return this.movie_list

        //   this.movie_list = movies;
        },
    }
    //write an action t
  });
  