import React from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'

import './App.css';

const particleOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    }/*,
    line_linked: {
      shadow: {
        enable: true,
        color: "3ca9d1",
        blue: 5
      }
    } */
  }
}

function App() {
  return (
    <div className="App">
    
      <Particles 
        className="particles"
        params={particleOptions}
      />

      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*
      <FaceRecognition /> 
      */}
    </div>
  );
}

export default App;
