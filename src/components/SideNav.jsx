import { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils/index.js"

export function SideNav(props){

    const { selectedPokemon, setSelectedPokemon, toggleSideNav, showSideMenu } = props;
    const [ inputValue, setInputValue ] = useState('');

    const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
        if(getFullPokedexNumber(eleIndex).includes(inputValue))  return true;
        if(ele.includes(inputValue) || ele.toLowerCase().includes(inputValue)) return true;
        return false;
    })

    return(
        <nav className={''+(!showSideMenu? 'open' : '')}>
            <div className={'header '+(!showSideMenu? 'open' : '')}>
                <button onClick={toggleSideNav} className="open-nav-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                </button>
                <h1 className="text-gradient">Pokedex</h1>
            </div>
            <input placeholder="Eg. 001 or Bulbasaur" value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} />

            {filteredPokemon.map((pokemon, pokemonIndex)=>{
                return(
                    <button className={'nav-card '+(first151Pokemon.indexOf(pokemon) === selectedPokemon? 'nav-card-selected' : '')} key={pokemonIndex} onClick={()=>{
                        setSelectedPokemon(first151Pokemon.indexOf(pokemon));
                    }}>
                        <p>{getFullPokedexNumber(first151Pokemon.indexOf(pokemon))}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}