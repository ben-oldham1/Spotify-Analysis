import React from 'react';

import TopItemsTableRow from './TopItemTableRow';

function TopItemsTable(props) {
    return <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Popularity</th>
                    <th scope="col">ID</th>
                </tr>
            </thead>
            <tbody>
                {props.topArtistsJson.map(topArtist =>
                    <TopItemsTableRow topArtist={topArtist} />
                )}
            </tbody>
        </table>
    </div>;
}

export default TopItemsTable;