import { defineStore } from 'pinia'

interface Movie {
    id: number;
    poster_path: string,
    title: string,
    overview: string
    genre_ids: Array<number>
}
export const useMovieStore = defineStore("movieStore", {
    state: () => ({
        movies: [] as Movie[],
    }),
    getters: {
      getMovies(state){
          return state.movies
        }
    },
    actions: {
      addMovie(movie: Movie) {
        this.movies.push(movie)
        return console.log('Movie add!')
      },
      deleteMovie(movie: Movie) {
        const newArray = this.movies.filter((item) => item.id !== movie.id)
        this.movies = newArray;
        return console.log('Movie delete!')
      }
    },
})
