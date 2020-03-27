import React, { Component } from "react";
import axios from "axios";

import PokeCard from "./PokeCard";

class PokemonList extends Component {
  state = {
    loading: false,
    player1: [],
    player2: [],
    player1Total: "",
    playter2Total: ""
  };

  randomNumArr() {
    let numArr = [];
    for (let i = 0; i < 8; i++) {
      let randNum = Math.floor(Math.random() * 30);
      randNum = randNum + 1;
      numArr.push(randNum);
    }
    return numArr;
  }

  shuffle = e => {
    e.preventDefault();
    let rdNum = this.randomNumArr();
    let resp = rdNum.map(async num => {
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}/`);
      return res;
    });
    //console.log(resp, "resp");

    axios.all(resp).then(responses => {
      //console.log(responses, "responses");
      let resp = responses.map(res => res.data);
      //console.log(resp, "resp");
      let player1 = resp.filter((item, index) => {
        if (index < 4) return item;
      });
      let player2 = resp.filter((item, index) => {
        if (index >= 4) return item;
      });
      let player1Total = player1
        .map(exp => {
          return exp.base_experience;
        })
        .reduce((acc, item) => {
          return acc + item;
        });
      let player2Total = player2
        .map(exp => {
          return exp.base_experience;
        })
        .reduce((acc, item) => {
          return acc + item;
        });

      this.setState({
        loading: true,
        player1,
        player2,
        player1Total,
        player2Total
      });
    });
  };
  async componentDidMount() {
    let rdNum = this.randomNumArr();
    rdNum = rdNum.map(num => {
      return axios.get(`https://pokeapi.co/api/v2/pokemon/${num}/`);
    });
    //console.log(rdNum, "rdNum");

    axios.all(rdNum).then(responses => {
      //console.log(responses, "responses");
      let resp = responses.map(res => res.data);
      //console.log(resp, "resp");
      let player1 = resp.filter((item, index) => {
        if (index < 4) return item;
      });
      let player2 = resp.filter((item, index) => {
        if (index >= 4) return item;
      });
      let player1Total = player1
        .map(exp => {
          return exp.base_experience;
        })
        .reduce((acc, item) => {
          return acc + item;
        });
      let player2Total = player2
        .map(exp => {
          return exp.base_experience;
        })
        .reduce((acc, item) => {
          return acc + item;
        });

      this.setState({
        loading: true,
        player1,
        player2,
        player1Total,
        player2Total
      });
    });
  }
  render() {
    const { player1, player2, player1Total, player2Total } = this.state;
    let winner =
      player1Total > player2Total ? "Player 1 Wins!" : "Player 2 Wins!";
    return (
      <React.Fragment>
        <div
          className="row"
          style={{ marginBottom: "1rem", textAlign: "center" }}
        >
          <div className="col-md-12">
            <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
              {winner}
            </h2>
            <button className="btn btn-primary" onClick={this.shuffle}>
              Shuffle
            </button>
          </div>
        </div>
        <div className="row">
          {player1.map(pokemon => (
            <PokeCard
              key={Math.random()}
              id={pokemon.id}
              name={pokemon.name}
              exp={pokemon.base_experience}
              type={pokemon.types}
              img={pokemon.sprites.front_default}
            />
          ))}
        </div>
        <div
          className="row"
          style={{ marginBottom: "1rem", textAlign: "center" }}
        >
          <div className="col-md-12">
            <p style={{ marginBottom: "1rem", textAlign: "center" }}>
              Player 1 Total: {player1Total}
            </p>
          </div>
        </div>
        <div className="row">
          {player2.map(pokemon => (
            <PokeCard
              key={Math.random()}
              id={pokemon.id}
              name={pokemon.name}
              exp={pokemon.base_experience}
              type={pokemon.types}
              img={pokemon.sprites.front_default}
            />
          ))}
        </div>
        <div
          className="row"
          style={{ marginBottom: "1rem", textAlign: "center" }}
        >
          <div className="col-md-12">
            <p style={{ marginBottom: "1rem", textAlign: "center" }}>
              Player 2 Total: {player2Total}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PokemonList;
