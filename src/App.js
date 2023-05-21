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
import Navbar from 'react-bootstrap/Navbar';

function App() {

  // ========== AUTHENTICATION LOGIC ==========
  
  // Redirect parameter for the spotify API
  const REDIRECT_URI = "https://spotify-analysis-1.vercel.app/";
  // const REDIRECT_URI = "http://localhost:3000/";
  
  // Other parameters for the spotify API
  const CLIENT_ID = "268fc0cf3a024f2a8b409bbdb8095567";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-top-read";

  // State variable to store the access token
  const [token, setToken] = useState("");

  // Use effect to handle authentication logic
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.sessionStorage.getItem("token");

    // Check if token is not present and the URL contains a hash
    if (!token && hash) {
      // Extract the access token from the hash
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      // Clear the hash from the URL
      window.location.hash = "";

      // Store the token in session storage
      window.sessionStorage.setItem("token", token);
    }

    // Set the access token
    setToken(token);
  }, []);

  // Function to log the user into Spotify
  function login() {
    // Construct the authorization URL for Spotify authentication
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    // Redirect the page to the authorization URL
    window.location.href = authUrl;
  }


  
  // ========== DATA FETCHING LOGIC ==========

  // State variable for settings data
  const [settingsData, setSettingsData] = useState({
    data_period: "medium_term",
  });

  // Function to handle term change
  const handleTermChange = (newTerm) => {
    setSettingsData({
      ...settingsData,
      data_period: newTerm,
    });
  };

  // State variables for API error and loading state
  const [apiError, setApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">

      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <Navbar.Brand>
            <img
              alt="Logo"
              src="/logo192.png"
              width="25"
              height="25"
              className="d-inline-block align-center"
            />{' '}
            Spotify Analysis
          </Navbar.Brand>

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

                    <GenreChart
                      setApiError={setApiError}
                      setIsLoading={setIsLoading}
                      settingsData={settingsData}
                      token={token}
                    />
                </Col>
              </Row>

            </div>
          </Container>

          <div className="bg-dark py-5">
            <Container>
              <Row>
                <Col className="text-light text-center">
                  <p className="my-0">
                    Made by Ben Oldham, find me on <a className="link-light" href="https://github.com/ben-oldham1">GitHub</a>
                    <br></br>
                    Powered by Spotify API
                  </p>
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

