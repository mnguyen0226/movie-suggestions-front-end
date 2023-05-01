import { defineStore } from "pinia";
const DEFAULT_MODE_NAME = "home-page"

export const useMovieStore = defineStore("CartStore", {

    state: () => {
       return{ 
           movie_list: [],
           selectedMode: DEFAULT_MODE_NAME,

           // track-implementation
           items: [], // array of items to render
           itemRefs: [], // array of refs to the item elements
           itemTimes: {}, // object to store time spent on screen for each item 
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
                    this.movie_list.push(someList[movie])
                }

            // set suggestion page
            } else if (this.selectedMode == 'suggestion-page'){
                const someList = await fetch("http://localhost:3000/suggestion-page").then((response)=>response.json())
                
                for(const movie in someList){
                    this.movie_list.push(someList[movie])
                }
                
            // set trending page
            } else if (this.selectedMode == 'trending-page'){
                const someList = await fetch("http://localhost:3000/trending-page").then((response)=>response.json())

                for(const movie in someList){
                    this.movie_list.push(someList[movie])
                }
                
            // else, set home-page
            } else { 
                const someList = await fetch("http://localhost:3000/home-page").then((response)=>response.json())

                for(const movie in someList){
                    if (i == 5){
                        break;
                    }
                    this.movie_list.push(someList[movie])
                    i += 1;
                }
                console.log(i);
            }
            return this.movie_list;
        },

        // setter
        async setSelectedMode(selectedMode){
            console.log(selectedMode)
            this.selectedMode = selectedMode;
        },

        // track-implemmentation
        async mounted() {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                  const index = this.itemRefs.indexOf(entry.target);
                  if (entry.isIntersecting) {
                    this.itemTimes[index] = Date.now(); // set start time
                    console.log(index + " Item Times: " + this.itemTimes[index])
                  } else {
                    const timeOnScreen = Date.now() - this.itemTimes[index];
                    this.itemTimes[index] = timeOnScreen; // store time spent on screen
                    console.log(index + " Time On Screen: " + this.itemTimes[index])
                  }
                });
            });

            // this.itemRefs = this.items.map(() => this.$refs.itemRefs.push(null));
            // nextTick(() => {
            //   this.itemRefs.forEach((ref) => {
            //     this.observer.observe(ref);
            //   });
            // });

            this.itemRefs = this.items.map((_, index) => this.$refs[`item-${index}`]);
            
            console.log("itemRefs: " + this.itemRefs)

            this.itemRefs.forEach((ref) => {
              this.observer.observe(ref);
            });


            // nextTick(() => {
            //     console.log("nextTick() is called")
            //     this.itemRefs = this.$refs.itemRefs;
            //     this.itemRefs.forEach((ref) => {
            //       this.observer.observe(ref);
            //     });
            //   });
        },
    }
});
  