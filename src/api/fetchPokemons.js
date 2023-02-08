import axios from 'axios'

export const baseUrl = 'https://pokeapi.co/api/v2/'

export const fetchPokemons = async () => {
    const result = []

    for (let i = 1; i <= 20; i++) { 
      const data = await axios.get(baseUrl + 'pokemon/' + i)
      result.push(data.data)
    }
    return result
}
