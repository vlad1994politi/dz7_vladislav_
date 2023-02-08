const PokemonCard = ({ pokemon }) => {

  if (!pokemon.hasOwnProperty('name')) {
      return <div>There is no data</div>
  }

  return ( 
      <div>
          <img src={pokemon.sprites.other.dream_world.front_default} alt='icon'/>
          <h1>{pokemon.name}</h1>

          <div>
              {pokemon.stats.map((item, i) =>
                  <div key={i}>
                      <span>{item.stat.name}</span>
                      <span>{item.base_stat}</span>
                  </div>
              )}
          </div>
      </div>
   );
}

export default PokemonCard;