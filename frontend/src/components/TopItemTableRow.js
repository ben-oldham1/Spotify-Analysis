import React from 'react';

function TopItemsTableRow(props) {
    return <tr>
        <th>1</th>
        <th>{props.topArtist.name}</th>
        <th>{props.topArtist.popularity}</th>
        <th>{props.topArtist.id}</th>
    </tr>;
}

export default TopItemsTableRow;