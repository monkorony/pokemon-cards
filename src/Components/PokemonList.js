import React, { Component } from "react";
import axios from "axios";

import PokeCard from "./PokeCard";

const test = [
  { id: 1, name: "Charmander", type: "fire", base_experience: 50 },
  { id: 2, name: "Charmander", type: "fire", base_experience: 50 }
];

class PokemonList extends Component {
  state = {
    loading: false,
    pokemonList: []
  };

  randomNumArr() {
    let numArr = [];
    for (let i = 0; i < 8; i++) {
      let randNum = Math.floor(Math.random() * 50);
      randNum = randNum + 1;
      numArr.push(randNum);
    }
    return numArr;
  }
  async componentDidMount() {
    let rdNum = this.randomNumArr();
    console.log(rdNum, "rdNum");
    rdNum = rdNum.map(num => {
      if (num === 0) return num === 1;
      return axios.get(`https://pokeapi.co/api/v2/pokemon/${num}/`);
    });

    axios.all(rdNum).then(responses => {
      //console.log(responses, "responses");
      let resp = responses.map(res => res.data);
      console.log(resp, "resp");
      this.setState({
        loading: true,
        pokemonList: resp
      });
    });
  }
  render() {
    const { pokemonList } = this.state;
    return (
      <div className="row">
        {pokemonList.map(pokemon => (
          <PokeCard
            id={pokemon.id}
            name={pokemon.name}
            exp={pokemon.base_experience}
            type={pokemon.types}
            img={pokemon.sprites.front_default}
          />
        ))}
      </div>
    );
  }
}

export default PokemonList;
