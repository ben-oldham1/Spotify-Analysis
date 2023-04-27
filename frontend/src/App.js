// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

import { Alignment, Navbar, Button, Card, Elevation } from "@blueprintjs/core";
import '@blueprintjs/core/lib/css/blueprint.css';


function App() {
  // usestate for setting a javascript
  // object for storing and using data
  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
  });

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
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Spotify Analysis</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp4-minimal" icon="home" text="Home" />
          <Button className="bp4-minimal" icon="document" text="Files" />
        </Navbar.Group>
      </Navbar>

      <header className="App-header">
        <h1>React and flask</h1>
        {/* Calling a data from setdata for showing */}
        <p>{data.name}</p>
        <p>{data.age}</p>
        <p>{data.date}</p>
        <p>{data.programming}</p>
      </header>

      <Card interactive={false} elevation={Elevation.ONE}>
        <h5><a href="#">Card heading</a></h5>
        <p>Card content</p>
        <Button>Submit</Button>
      </Card>

      <Button intent="success" text="button content" />
    </div>
  );
}

export default App;

