import React, { useState, useEffect } from "react";
import axios from "axios";

import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';

function TopTracks(props) {
    const [topTracks, setTopTracks] = useState([])

    // Gets the top tracks for a user
    const getTopTracks = async () => {

        // Renders a loading message while we get the data
        props.setIsLoading(true);

        // Make API call
        const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
            headers: {
                Authorization: `Bearer ${props.token}`
            },
            params: {
                limit: "6",
                offset: "0",
                time_range: props.settingsData["data_period"]
            },
            timeout: 5000
        }).catch(function (error) {
            // This will render an alert so the user knows there has been an error
            props.setApiError(true)
            props.setIsLoading(false);
        })

        // Store the response in TopArtists state
        setTopTracks(data['items'])
        console.log(data['items'])
        props.setIsLoading(false);
    }

    useEffect(() => {
        if (props.token) {
            getTopTracks();
        }
    }, [props.settingsData.data_period]);


    // Call the fetchTopArtists function after the token is set
    useEffect(() => {
        if (props.token) {
            getTopTracks();
        }
    }, [props.token])

    return (
        <>
            {topTracks.map(topTrack =>
                <div className='col-md-4 mb-5 text-center' key={topTrack.id}>
                    <Stack>
                        <div className='mb-3'>
                            <a href={topTrack.external_urls.spotify}>
                                <img src={topTrack.album.images[0].url} className="grow" height='200px'></img>
                            </a>
                        </div>
                        <h3 className="text-white">{topTrack.name}</h3>
                    </Stack>
                </div>
            )}
        </>
    );
}

export default TopTracks;