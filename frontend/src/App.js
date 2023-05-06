// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

import TopArtistsTable from "./components/TopArtistsTable";
import AlertDismissible from "./components/Alert";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";
import GenreChart from "./components/GenreChart";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';

import { ReactComponent as Wave1 } from './components/Wave1.svg';
import { ReactComponent as Wave2 } from './components/Wave2.svg';

import axios from "axios";

function App() {
  // usestate for setting a javascript
  // object for storing and using data
  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
  });

  // ========== AUTHENTICATION LOGIC ==========

  const CLIENT_ID = "268fc0cf3a024f2a8b409bbdb8095567";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-top-read";

  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.sessionStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.sessionStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  // Function to log the user into Spotify
  function login() {
    // Construct the authorisation URL, where users can grant my app access to spotify
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    // Redirect page to the URL above
    window.location.href = authUrl;
  }

  // Removes the authorisation token, thus logging the user out from Spotify
  const logout = () => {
    setToken("")
    window.sessionStorage.removeItem("token")
  }


  // ========== DATA FETCHING LOGIC ==========

  const [apiError, setApiError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const [topArtists, setTopArtists] = useState([])
  const [topTracks, setTopTracks] = useState([])
  const [topGenre, setTopGenre] = useState([])


  // Gets the top artists for a user
  const getTopArtists = async (e) => {
    e.preventDefault()

    // Renders a loading message while we get the data
    setIsLoading(true);

    // Make API call
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit: "3",
        offset: "0",
        time_range: "medium_term"
      },
      timeout: 5000
    }).catch(function (error) {
      // This will render an alert so the user knows there has been an error
      setApiError(true)
      setIsLoading(false);
    })

    // Store the response in TopArtists state
    setTopArtists(data['items'])

    setIsLoading(false);
  }

  // Gets the top artists for a user
  const getTopGenres = async (e) => {
    e.preventDefault()

    // Renders a loading message while we get the data
    setIsLoading(true);

    // Make API call
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit: "8",
        offset: "0",
        time_range: "medium_term"
      },
      timeout: 5000
    }).catch(function (error) {
      // This will render an alert so the user knows there has been an error
      setApiError(true)
      setIsLoading(false);
    })

    // Store the response in TopArtists state
    setTopGenre(data['items'])

    setIsLoading(false);
  }

  // Gets the top tracks for a user
  const getTopTracks = async (e) => {
    e.preventDefault()

    // Renders a loading message while we get the data
    setIsLoading(true);

    // Make API call
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit: "6",
        offset: "0",
        time_range: "medium_term"
      },
      timeout: 5000
    }).catch(function (error) {
      // This will render an alert so the user knows there has been an error
      setApiError(true)
      setIsLoading(false);
    })

    // Store the response in TopArtists state
    setTopTracks(data['items'])

    setIsLoading(false);
  }

  return (
    <div className="App">

      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand">Spotify Analyser</a>

          {!token ?
            <button className="btn btn-secondary" onClick={login}>
              Login to Spotify
            </button>

            : <button className="btn btn-secondary" onClick={logout}>Logout</button>
          }

        </div>
      </nav>


      {!token ?
        <div className="my-5 text-center">
          <h3>Login to Spotify to get started!</h3>
        </div>
        :
        <>

          <Container>

            {apiError ?
              <Row>
                <AlertDismissible headerText="Error" bodyText="An error has occcured while accessing your Spotify data. Try again!" apiError={apiError} setApiError={setApiError} />
              </Row>
              : null
            }

            <div className="py-5">
              <Row className="mb-3">
                <Col>
                  <h1 className="text-center">Top Artists</h1>
                </Col>
              </Row>

              <Row>
                {isLoading ?
                  <div>
                    <Spinner animation="border" role="status" />
                    <p>Getting your data...</p>
                  </div>
                  : null}
                <TopArtists topArtistsJson={topArtists} />
              </Row>

              <form onSubmit={getTopArtists}>
                <button className="btn btn-primary" type={"submit"}>Get top Artists</button>
              </form>
            </div>

          </Container>

          <Wave1 />

          <div className="bg-dark">
            <Container>

              <div className="py-5">
                <Row className="mb-3">
                  <Col>
                    <h1 className="text-center text-white">Top Tracks</h1>
                  </Col>
                </Row>

                <Row className="mb-3">
                  {isLoading ?
                    <div>
                      <Spinner animation="border" role="status" />
                      <p className="text-white">Getting your data...</p>
                    </div>
                    : null}

                  <TopTracks topTracksJson={topTracks} />
                </Row>

                <Row>
                  <form onSubmit={getTopTracks}>
                    <button className="btn btn-secondary" type={"submit"}>Get top songs</button>
                  </form>
                </Row>
              </div>

            </Container>
          </div>

          <Wave2 />

          <Container>
            <Row>
              <Col className="text-center">
                <h1>Top Genres</h1>
              </Col>
            </Row>

            <Row>
              <Col className="text-center">
                <GenreChart topGenreJson={topGenre} />
              </Col>
            </Row>

            <Row>
              <form onSubmit={getTopGenres}>
                <button className="btn btn-secondary" type={"submit"}>Get top genres</button>
              </form>
            </Row>
          </Container>

        </>
      }



    </div>
  );
}

export default App;

