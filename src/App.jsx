import { useState, useEffect } from 'react'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [showButton, setShowButton] = useState(true)
  const [isAllowedToFetch, setIsAllowedToFetch] = useState(false)
  const [currentScore, setCurrentScore] = useState(0)
  //bestscoren voisi hakea localstoragesta
  const [bestScore, setBestScore] = useState(0)

  const pokemonNames = ["ditto", "eevee", "pikachu", "rhydon", "snorlax", "bulbasaur"
    , "mewtwo", "charizard", "arcanine"]

  const clickedPokemon = []

  function handleClick(event) {
    console.log(event.target)
    //jos clikattu pokemoni on jo taulukossa, niin resettaa score
    //ja aseta se best scoreksi jos se on suurempi kuin tämänhetkinen bestscore

    //täällä pitäisi myös renderöidä pokemonit uudestaan
  }

  function updateBestScore() {
    if (currentScore > bestScore) setBestScore(currentScore)
      return bestScore
  }

  useEffect(() => {
    if (isAllowedToFetch === false) return
    Promise.all(
      pokemonNames.map(name => 
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
          .then(res => res.json())
          .then(data => ({ name, img: data.sprites.front_default }))
      )
    ).then(results => setPokemon(results))
  }, [isAllowedToFetch])

  return (
    <div id="mainContent">
      <div id="cardsContainer">
        {pokemon.map(poke => <DrawPokemon key={poke.name} poke={poke} handleClick={handleClick}/>)}
      </div>
      <button onClick={() => {
        setShowButton(false)
        setIsAllowedToFetch(true)
      }} className={showButton? "showElement" : "hideElement"}>Start game</button>
      <div className={showButton? "hideElement" : "showElement"}>
        <h2>Pokemon memorycards</h2>
        <p>Current score: {currentScore}</p>
        <p>Best score: {updateBestScore()}</p>
      </div>
    </div>
  )
}

function DrawPokemon({poke, handleClick}) {
  return (
    <div id={poke.name} onClick={handleClick} className="pokemonCard">
      <p id={poke.name} className="pokemonTitle">{poke.name}</p>
      <img id={poke.name} src={poke.img} alt="" />
    </div>
  )
}

export default App
