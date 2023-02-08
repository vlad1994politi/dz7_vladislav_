import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchAllPokemons, fetchPokemon } from './api/fetchPokemon';
import './App.css';
import PokemonCard from './components/PokemonCard';
import SkeletonCard from './components/SkeletonCard';

function App() {

  const inputRef = useRef(null)
  const [ currentPokemon, setCurrentPokemon ] = useState({})

  const [ pag, setPag ] = useState({
    from: 1,
    till: 20,
  })

  console.log(pag)
  const [ pokemonList, setPokemonList ] = useState([])

  useEffect(() => {
    submitPokemons()
  }, [])

  const submitPokemons = () => {
    fetchAllPokemons(pag.from, pag.till)
      .then((data) => {
        const newData = pokemonList.concat(data)
        setPokemonList(newData)
      })
      .then((data) => {
        setPag(prev => ({ from: prev.from + 20, till: prev.till + 20}))
      })
  }

  const handleSearch = () => {
    fetchPokemon(inputRef.current.value)
      .then((data) => {
        setCurrentPokemon(data)
      })
  }

  const handleNextPage = () => {
    setPag(prev => ({ from: prev.from + 20, till: prev.till + 20 }))
  }

  const handlePrevPage = () => {
    if (pag.from === 1) {
      return
    }
    setPag(prev => ({ from: prev.from - 20, till: prev.till - 20 }))
  }

  return (
    <div className="App">
      <input ref={inputRef} placeholder='search'/>
      <button onClick={handleSearch}>Get pokemon</button>
      <PokemonCard pokemon={currentPokemon}/>

      <button onClick={handlePrevPage}>prev page</button>
      <button onClick={handleNextPage}>next page</button>

      <InfiniteScroll
      dataLength={pokemonList.length}
      next={submitPokemons}
      hasMore={true}
      loader={<div>
        {[...Array(20)].map((item) => <SkeletonCard/>)}
      </div>}
      >
        {pokemonList.map((item) => 
          <PokemonCard pokemon={item}/>
        )}
      </InfiniteScroll>
    </div>
  );
}

export default App;