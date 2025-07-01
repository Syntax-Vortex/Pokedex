import { Header } from "./components/Header"
import { PokeCard } from "./components/PokeCard"
import { SideNav } from "./components/SideNav"
import { useState } from "react"

function App() {

    const [selectedPokemon, setSelectedPokemon] = useState(0);
    const [showSideMenu, setShowSideMenu] = useState(false);

    function toggleSideNav(){
        setShowSideMenu(!showSideMenu);
    }

    return (
        <>
            <Header toggleSideNav={toggleSideNav}/>
            <SideNav selectedPokemon = {selectedPokemon} setSelectedPokemon = {setSelectedPokemon} showSideMenu={showSideMenu} toggleSideNav={toggleSideNav}/>
            <PokeCard selectedPokemon = {selectedPokemon}/>
        </>
    )
}

export default App
