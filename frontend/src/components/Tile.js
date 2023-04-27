import React from 'react';

function Tile(props) {
    return <div class="card">
    <div class="card-header bg-dark text-light">
      { props.headerText }
    </div>
    <div class="card-body">
      <p class="card-text">{props.data.name}</p>
      <p class="card-text">{props.data.age}</p>
      <p class="card-text">{props.data.date}</p>
      <p class="card-text">{props.data.programming}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>;
}


export default Tile;