import { defineStore } from "pinia";

export const useMovieStore = defineStore("CartStore", {
    state: () => {
       return{ movie_list: []}
    },
    getters: {
       getMovies(){
            return this.movie_list;
        }
    },
    actions: {
        async fetchMovies() {
            console.log("Called here")
            const someList =await fetch("http://localhost:3000/home-page").then((response)=>response.json())

            for(const movie in someList){
                this.movie_list.push(someList[movie])
            }
            return this.movie_list;

        //   this.movie_list = movies;
        },
    }
    //write an action t
  });
  