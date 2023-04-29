import { defineStore } from "pinia";

// home-page
// suggestion-page
// trending-page
const DEFAULT_MODE_NAME = "home-page"

export const useMovieStore = defineStore("CartStore", {
    state: () => {
       return{ 
           movie_list: [],
           selectedMode: DEFAULT_MODE_NAME,
        }
    },
    getters: {
       getMovies(){
            return this.movie_list;
        }
    },
    actions: {
        // fetch movie mode
        async fetchMovies() {
            var i = 0; 
            
            // reset the list
            this.movie_list = []

            // set home page
            if (this.selectedMode == 'home-page'){
                const someList = await fetch("http://localhost:3000/home-page").then((response)=>response.json())

                for(const movie in someList){
                    if (i == 6){
                        break;
                    }
                    this.movie_list.push(someList[movie])
                    i += 1;
                }
                console.log(i);


            // set suggestion page
            } else if (this.selectedMode == 'suggestion-page'){
                const someList = await fetch("http://localhost:3000/home-page").then((response)=>response.json())
                
                for(const movie in someList){
                    if (i == 5){
                        break;
                    }
                    this.movie_list.push(someList[movie])
                    i += 1;
                }

                console.log(i);
                
            // set trending page
            } else if (this.selectedMode == 'trending-page'){
                const someList = await fetch("http://localhost:3000/home-page").then((response)=>response.json())

                for(const movie in someList){
                    this.movie_list.push(someList[movie])
                }
                
            // else, set home-page
            } else { 
                const someList = await fetch("http://localhost:3000/home-page").then((response)=>response.json())

                for(const movie in someList){
                    this.movie_list.push(someList[movie])
                }
            }
            return this.movie_list;
        },
        // setter
        async setSelectedMode(selectedMode){
            console.log(selectedMode)
            this.selectedMode = selectedMode;
        }
    }
  });
  