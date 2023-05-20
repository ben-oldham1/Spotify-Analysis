import React, { useState, useEffect } from "react";
import axios from "axios";

import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';


function TopArtists(props) {
  const [topArtists, setTopArtists] = useState([])

  // Function to fetch top artists data
  const fetchTopArtists = async () => {

    props.setIsLoading(true);

    const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${props.token}`
      },
      params: {
        limit: "3",
        offset: "0",
        time_range: props.settingsData["data_period"]
      },
      timeout: 5000
    }).catch(function (error) {
      props.setApiError(true)
      props.setIsLoading(false);
    })

    setTopArtists(data['items'])
    props.setIsLoading(false);
  };

  useEffect(() => {
    if (props.token) {
      fetchTopArtists();
    }
  }, [props.settingsData.data_period]);

  // Call the fetchTopArtists function after the token is set
  useEffect(() => {
    if (props.token) {
      fetchTopArtists();
    }
  }, [props.token])

  return (
    <>
      {topArtists.map(topArtist =>
        <div className='col-md-4 text-center mb-5' key={topArtist.id}>
          <Stack>
            <div>
              <img src={topArtist.images[1].url} className="grow mb-3" height='230px'></img>
            </div>
            <h3>{topArtist.name}</h3>
          </Stack>
        </div>
      )}
    </>
  );
}

export default TopArtists;