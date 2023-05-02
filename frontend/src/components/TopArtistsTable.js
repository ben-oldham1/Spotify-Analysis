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
        </tr>
      </thead>

      <tbody>
        {props.topArtistsJson.map(topArtist =>

          <tr key={topArtist.id}>
            <th>
              <img src={topArtist.images[1].url} width='60px'></img>
            </th>
            <td>{topArtist.name}</td>
            <td>{topArtist.popularity}</td>
          </tr>

        )}
      </tbody>
    </Table>
  );
}

export default TopArtistsTable;