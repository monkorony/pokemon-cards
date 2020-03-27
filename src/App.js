import React from "react";
import "./App.css";
import PokemonList from "./Components/PokemonList";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Pokemon Card Game</h1>
            <PokemonList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
