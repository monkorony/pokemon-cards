import React from "react";

export default function PokeCard(props) {
  const { id, name, img, exp } = props;
  return (
    <div className="col-md-3">
      <div className="card" style={{ marginBottom: "2rem" }}>
        <p style={{ textAlign: "center" }}>
          <img
            style={{ maxWidth: "150px" }}
            className="card-img-top"
            src={img}
          />
        </p>
        <div className="card-body">
          <h5>{name}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">ID: {id}</li>
            <li className="list-group-item">Exp: {exp}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
