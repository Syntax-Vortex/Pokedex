import { useState } from "react";
import { useEffect } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import { TypeCard } from './TypeCard.jsx'
import { Modal } from "./Modal.jsx";

export function PokeCard(props){
    const {selectedPokemon} = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [skill, setSkill] = useState(null);
    const [loadingSkill, setLoadingSkill] = useState(false);

    const { name, height, abilities, stats, types, moves, sprites } = data || {};

    const imgList = Object.keys(sprites || {}).filter(val => {
        if(!sprites[val]) return false;
        if(['versions', 'other'].includes(val)) return false;
        return true;
    })

    async function fetchMoveData(move, moveURL){
        if(loadingSkill || !localStorage || !moveURL) return;


        let c = {}; //cache
        if(localStorage.getItem('pokemonMoves')){
            c = JSON.parse(localStorage.getItem('pokemonMoves'));
        }
        if(move in c){
            setSkill(c[move]);
            return;
        }

        try{
            setLoadingSkill(true);
            const res = await fetch(moveURL);
            const moveData = await res.json();
            const description = moveData.flavor_text_entries.filter
                (val => {
                    return (val.version_group.name === 'firered-leafgreen')
                })[0].flavor_text;
            
            const skillData = {
                name: move,
                description: description
            };
            setSkill(skillData);
            c[move] = skillData;
            localStorage.setItem('pokemonMoves', JSON.stringify(c));
        }catch(err){
            console.log(err);
        }finally{
            setLoadingSkill(false);
        }
    }

    useEffect(()=>{
        if(loading || !localStorage) return

        let cache = {}
        if(localStorage.getItem('pokedex')){
            cache = JSON.parse(localStorage.getItem('pokedex'));
        }

        if(selectedPokemon in cache){
            setData(cache[selectedPokemon]);
            return;
        }

        async function fetchPokemonData() {
            try{
                const baseURL = 'https://pokeapi.co/api/v2/';
                const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon);
                const res = await fetch(baseURL + suffix);
                const pokemonData = await res.json();
                setData(pokemonData);
                console.log(pokemonData);
                cache[selectedPokemon] = pokemonData;
                localStorage.setItem('pokedex', JSON.stringify(cache));
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false);
            }
        }

        fetchPokemonData();

    }, [selectedPokemon]);

    if(loading || !data){
        return(
            <div className="poke-card">
                <h4>Loading...</h4>
            </div>
        )
    }

    return(
        <div className="poke-card">
            {skill && (<Modal handleCloseModal = {()=>{setSkill(null)}}>
                <div>
                    <h6>Name</h6>
                    <h2>{skill.name.replaceAll('-', ' ')}</h2>
                </div>
                <div>
                    <h6>Description</h6>
                    <p>{skill.description}</p>
                </div>
            </Modal>)}

            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeObj, typeIndex) => {
                    return(
                        <TypeCard key = {typeIndex} type = {typeObj.type.name} />
                    )
                })}
            </div>
            <img src={"/Pokemon/" + getFullPokedexNumber(selectedPokemon) + '.png'} className="default-img" />
            <div className="img-container">
                {imgList.map((spriteURL, spriteIndex) => {
                    return(
                        <img key={spriteIndex} src={sprites[spriteURL]} />
                    )
                })}
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
                {stats.map((statObj, statIndex) => {
                    const {stat, base_stat} = statObj;
                    return(
                        <div key={statIndex} className="stat-item">
                            <p>{stat.name.replaceAll('-', ' ')}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
            <h3>Moves</h3>
            <div className="pokemon-move-grid">
                {moves.map((moveObj, moveIndex) => {
                    return(
                        <button className="button-card pokemon-move" key={moveIndex}
                    onClick={()=>{
                        fetchMoveData(moveObj.move.name, moveObj.move.url);
                    }}>
                        <p>{moveObj.move.name.replaceAll('-', ' ')}</p>
                    </button>
                    )
                })}
            </div>
        </div>
    )
}