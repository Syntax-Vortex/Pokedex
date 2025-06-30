import { first151Pokemon, getFullPokedexNumber } from "../utils/index.js"

export function SideNav(props){

    const { selectedPokemon, setSelectedPokemon } = props;

    return(
        <nav>
            <div className="header">
                <h1 className="text-gradient">Pokedex</h1>
            </div>
            <input />
            {first151Pokemon.map((pokemon, pokemonIndex)=>{
                return(
                    <button className={'nav-card '+(pokemonIndex === selectedPokemon? 'nav-card-selected' : '')} key={pokemonIndex} onClick={()=>{
                        setSelectedPokemon(pokemonIndex);
                    }}>
                        <p>{getFullPokedexNumber(pokemonIndex)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}