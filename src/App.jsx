import { useState, useEffect } from 'react'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [showButton, setShowButton] = useState(true)
  const [isAllowedToFetch, setIsAllowedToFetch] = useState(false)
  const [currentScore, setCurrentScore] = useState(0)
  //bestscoren voisi hakea localstoragesta
  const [bestScore, setBestScore] = useState(0)
  const [clickedPokemon, setClickedPokemon] = useState([])
  const [isGameOver, setIsGameOver] = useState(false)

  //let pokemonNames = ["ditto", "eevee", "pikachu", "rhydon", "snorlax", "bulbasaur", "mewtwo", "charizard", "arcanine", "squirtle"]
  let pokemonNames = ["ditto", "eevee", "pikachu", "rhydon", "snorlax"]

  function handleClick(event) {
    if (isGameOver === true) return

    if (currentScore === pokemon.length) {
      setIsGameOver(true)
      console.log("T")
      return
    }

    const clicked = event.currentTarget.id

    if (!(clickedPokemon.length > 0 && clickedPokemon.find(pokemon => pokemon === clicked))) {
      setClickedPokemon(prev => ([
        ...prev,
        clicked
      ]))
      setCurrentScore(currentScore + 1)
    } else {
      setCurrentScore(0)
      setClickedPokemon([])
    }
    const newArr = [...pokemon]
    const shuffled = shuffle(newArr) 
    setPokemon(shuffled)
  }

  function shuffle(array) {
    const shuffledArr = []
    for (let i = array.length - 1; i >= 0; i--) {
      const index = Math.floor(Math.random() * (array.length))
      shuffledArr.push(array[index])
      array.splice(index, 1)
    }
    return shuffledArr
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
          .then(data => ({name: name, img: data.sprites.front_default}))
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
      }} className={showButton? "showElement" : "hideElement"}>Start game
      </button>

      <div className={isGameOver? "showElement" : "hideElement"}>
        <p>Gongrats, you won!</p>
      </div>

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
      <p className="pokemonTitle">{poke.name}</p>
      <img src={poke.img} alt="" />
    </div>
  )
}

export default App
