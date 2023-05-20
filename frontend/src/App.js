// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

import AlertDismissible from "./components/Alert";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";
import GenreChart from "./components/GenreChart";
import SettingsModal from './components/SettingsModal';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

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

  // const REDIRECT_URI = "https://spotify-analysis-1.vercel.app/";
  const REDIRECT_URI = "http://localhost:3000/";

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




  // ========== DATA FETCHING LOGIC ==========

  const [settingsData, setSettingsData] = useState({
    "data_period": "medium_term"
  });

  const handleTermChange = (newTerm) => {
    setSettingsData({
      ...settingsData,
      "data_period": newTerm
    });
  }

  const [apiError, setApiError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const [topGenre, setTopGenre] = useState([])


  useEffect(() => {
    if (token) {
      getTopGenres();
    }
  }, [settingsData.data_period]);


  // Call the fetchTopArtists function after the token is set
  useEffect(() => {
    if (token) {
      getTopGenres();
    }
  }, [token])

  // Gets the top genres for a user
  const getTopGenres = async () => {

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
        time_range: settingsData["data_period"]
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


  return (
    <div className="App">

      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand">Spotify Analyser</a>

          {!token ?
            <button className="btn btn-secondary" onClick={login}>
              Login to Spotify
            </button>

            : <div>

              <SettingsModal
                setToken={setToken}
                selectedTerm={settingsData.data_period}
                onTermChange={handleTermChange}
              />
            </div>
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

            <div className="py-5 my-5">
              <Row className="mb-5">
                <Col>
                  <h1 className="text-center">Top Artists</h1>
                </Col>
              </Row>

              <Row className="overflow-auto">
                {isLoading ?
                  <div>
                    <Spinner animation="border" role="status" />
                    <p>Getting your data...</p>
                  </div>
                  : null}
                <TopArtists
                  setApiError={setApiError}
                  setIsLoading={setIsLoading}
                  settingsData={settingsData}
                  token={token}
                />
              </Row>
            </div>

          </Container>

          <div className="bg-dark">
            <Container>

              <div className="py-5 my-5">
                <Row className="my-5">
                  <Col>
                    <h1 className="text-center text-white">Top Tracks</h1>
                  </Col>
                </Row>

                <Row className="overflow-auto">
                  {isLoading ?
                    <div>
                      <Spinner animation="border" role="status" />
                      <p className="text-white">Getting your data...</p>
                    </div>
                    : null}

                  <TopTracks
                    setApiError={setApiError}
                    setIsLoading={setIsLoading}
                    settingsData={settingsData}
                    token={token}
                  />
                </Row>
              </div>

            </Container>
          </div>

          <Container>
            <div className="py-5 my-5">

              <Row className="mb-5">
                <Col>
                  <h1 className="text-center">Top Genres</h1>
                </Col>
              </Row>

              <Row>
                <Col className="text-center overflow-auto">
                  {isLoading ?
                    <div>
                      <Spinner animation="border" role="status" />
                      <p className="text-white">Getting your data...</p>
                    </div>
                    : null}

                  {topGenre.length ?
                    <GenreChart topGenreJson={topGenre} />
                    : null}
                </Col>
              </Row>

            </div>
          </Container>

          <div className="bg-dark py-5">
            <Container>
              <Row>
                <Col className="text-light text-center">
                  <p>Made by Ben Oldham, find me on <a className="link-light" href="https://github.com/ben-oldham1">GitHub</a></p>
                </Col>
              </Row>
            </Container>
          </div>

        </>
      }



    </div>
  );
}

export default App;

