// Components:
import Button from "./components/Button"
import Card from "./components/Card";
//Sass:
import "./sass/App.scss"
//Icons:
import { CiFaceFrown } from "react-icons/ci";
import { CiFaceSmile } from "react-icons/ci";
//Hooks:
import { useState } from "react";
import { useEffect } from "react";



const App = () => {
    const [pokemonId, setPokemonId] = useState(1)
    const [pokemonEvolution, setPokemonEvolution] = useState([])

    useEffect(() => {
        getEvoluciones(pokemonId);

    }, [pokemonId])

    async function getEvoluciones(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        const data = await response.json()


        let pokemonArray = []
        let pokemonName1 = data.chain.species.name
        let pokemonImg1 = await getPokemonImg(pokemonName1)

        pokemonArray.push([pokemonName1, pokemonImg1])

        if (data.chain.evolves_to.length !== 0) {
            let pokemonName2 = data.chain.evolves_to[0].species.name
            let pokemonImg2 = await getPokemonImg(pokemonName2)
            pokemonArray.push([pokemonName2, pokemonImg2])

            if (data.chain.evolves_to[0].evolves_to.length !== 0) {
                let pokemonName3 = data.chain.evolves_to[0].evolves_to[0].species.name
                let pokemonImg3 = await getPokemonImg(pokemonName3)
                pokemonArray.push([pokemonName3, pokemonImg3])
            }
        }


        console.log(pokemonArray)
        setPokemonEvolution(pokemonArray)
    }

    async function getPokemonImg(name) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data = await response.json()


        return (data.sprites.other.dream_world.front_default)

    }
    const antClick = () => {
        if (pokemonId > 1) {
            setPokemonId(pokemonId - 1)
        }
    }
    const sigClick = () => {
        setPokemonId(pokemonId + 1)
    }

    return (
        <>
            <div className="app">
                <div className={`card__container card${pokemonEvolution.length}`}>
                    {pokemonEvolution.map(pokemon => <Card
                        key={pokemon[0]}
                        name={pokemon[0]}
                        img={pokemon[1]}
                    />)}

                </div>

                <div className="btn__container">
                    <Button icon={<CiFaceFrown />} handleClick={antClick} />

                    <Button icon={<CiFaceSmile />} handleClick={sigClick} />
                </div>
            </div>
        </>

    )
}
export { App }