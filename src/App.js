// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

import AlertDismissible from "./components/Alert";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";
import GenreChart from "./components/GenreChart";
import SettingsModal from './components/SettingsModal';

import { handleAuthentication, getAuthorisationUrl } from "./components/Authorisation";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Navbar from 'react-bootstrap/Navbar';

import spotify_logo from './media/spotify_logo.png';

function App() {

  // ========== AUTHENTICATION LOGIC ==========
  
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = handleAuthentication();
    setToken(token);
  }, []);

  function login() {
    const authUrl = getAuthorisationUrl();
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
                <AlertDismissible headerText="Error" bodyText="An error has occcured while accessing your Spotify data. 
                Try logging out and back in again!" apiError={apiError} setApiError={setApiError} />
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
                  <p>
                    Made by Ben Oldham, find me on <a className="link-light" href="https://github.com/ben-oldham1">GitHub</a>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="text-light text-center">
                  <img src={spotify_logo} alt="Spotify logo" width={150}></img>
                </Col>
              </Row>
              <Row>
                <Col className="text-light text-center">
                  <p>
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

