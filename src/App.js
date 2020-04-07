import React from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'

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

const app = new Clarifai.App({
  apiKey: '00fbee84922145f3a6f2eb2519ed3aef'
 });

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      boxes: []
    }
  }

  calculateFaceLocation = (data) => {
    // console.log(data);
    const dataRegionArr = data.outputs[0].data.regions
    
    const boxes = dataRegionArr.map((region) => {
      const clarifaiData = region.region_info.bounding_box
      // console.log(clarifaiData);
      const image = document.getElementById('inputimage')
      const width = Number(image.width) 
      const height = Number(image.height)
      
      return {
        topRow: height * clarifaiData.top_row ,
        rightCol: width * (1-clarifaiData.right_col),
        bottomRow: height * (1-clarifaiData.bottom_row),
        leftCol: width * clarifaiData.left_col
      }      
    })

    return boxes
    
  }

  displayFaceBox(boxes) {
    // console.log(box);
    this.setState({ boxes })
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({
      input: event.target.value
    })
  }

  onButtonSubmit = (event) => {
    // console.log('Click');
    this.setState({
      imageUrl: this.state.input
    })

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input
    ).then((response) => {
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="App">
      
        <Particles 
          className="particles"
          params={particleOptions}
        />

        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        
        <FaceRecognition imageUrl={this.state.imageUrl}
          boxes={this.state.boxes}
        /> 
        
      </div>
    );
  }
}

export default App;
