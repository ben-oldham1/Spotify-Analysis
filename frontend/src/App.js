// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

import TopArtistsTable from "./components/TopArtistsTable";
import Alert from "./components/Alert";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

  const CLIENT_ID = "268fc0cf3a024f2a8b409bbdb8095567";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const [topArtists, setTopArtists] = useState([])
  const [topSongs, setTopSongs] = useState([])
  const [apiError, setApiError] = useState([])

  const getTopArtists = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit: "5",
        offset: "0",
        time_range: "short_term"
      }
    }).catch(function (error) {
      setApiError(true)
    })
    setTopArtists(data['items'])
  }

  const getTopSongs = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit: "5",
        offset: "0",
        time_range: "short_term"
      }
    })
    setTopSongs(data['items'])
  }


  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    fetch("/data").then((res) =>
      res.json().then((data) => {
        // Setting a data from api
        setdata({
          name: data.Name,
          age: data.Age,
          date: data.Date,
          programming: data.programming,
        });
      })
    );
  }, []);

  return (
    <div className="App">

      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand">Spotify Analyser</a>
          {!token ?
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`}>
              <button className="btn btn-secondary">Login to Spotify</button>
            </a>
            : <button className="btn btn-secondary" onClick={logout}>Logout</button>}
        </div>
      </nav>

      <Container>

        <Row>

          <Col>
            <Card>
              <Card.Header>Top artists</Card.Header>
              <Card.Body>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>

                <TopArtistsTable topArtistsJson={topArtists} />

                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
           <p>another col</p>
          </Col>

        </Row>

        <Row>
          <form onSubmit={getTopArtists}>
            <button className="btn btn-primary" type={"submit"}>Get top artists</button>
          </form>
          <form onSubmit={getTopSongs}>
            <button className="btn btn-secondary" type={"submit"}>Get top songs</button>
          </form>
        </Row>

      </Container>

    </div>
  );
}

export default App;

