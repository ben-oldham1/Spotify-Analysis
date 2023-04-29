import React from 'react';

import Table from 'react-bootstrap/Table';

function TopArtistsTable(props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>ID</th>
        </tr>
      </thead>

      <tbody>
        {props.topArtistsJson.map(topArtist =>

          <tr>
            <th>
              <img src={topArtist.images[1].url} width='60px'></img>
            </th>
            <td>{topArtist.name}</td>
            <td>{topArtist.popularity}</td>
            <td>{topArtist.id}</td>
          </tr>

        )}
      </tbody>
    </Table>
  );
}

export default TopArtistsTable;