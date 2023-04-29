import React from 'react';

function TopItemsTableRow(props) {
    return <tr>
        <th>
            <img src={props.topArtist.images[1].url} width='60px'></img>
        </th>
        <td>{props.topArtist.name}</td>
        <td>{props.topArtist.popularity}</td>
        <td>{props.topArtist.id}</td>
    </tr>;
}

export default TopItemsTableRow;