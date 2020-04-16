import React from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Register from './components/Register/Register'
import Signin from './components/Signin/Signin'
import Particles from 'react-particles-js'
// import Clarifai from 'clarifai'

import './App.css';

// const apiHomeUrl = 'http://localhost:3001'

const particleOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

/*
const app = new Clarifai.App({
  apiKey: '8d084023703b4e8e800d27013c8b7daa'
});
*/

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false, 
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route })
  }

  loadUser = (user) => {
    const { id, name, email, entries, joined } = user
    this.setState({
      user: { id, name, email, entries, joined }
    })
  }

  calculateFaceLocation = (clarifaiDataArr) => {
    // console.log(faceBoxRegions);    
    const boxes = clarifaiDataArr.map((clarifaiData) => {
      // const clarifaiData = region.region_info.bounding_box
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

  onPictureSubmit = (event) => {
    // console.log('Click');
    this.setState({
      imageUrl: this.state.input
    })
/*
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input
    ) */

    fetch('http://localhost:3001/image/facedetect',{
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ imageUrl: this.state.input})
    })
    .then(response => response.json())
    .then((faceData) => {
      // console.log(faceData);
      if (faceData.faceDetectError) {
        throw new Error('Issue with CLARIFAI api')
      }
      
      this.displayFaceBox(this.calculateFaceLocation(faceData))

      fetch('http://localhost:3001/image', {        
        method: 'put',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ id: this.state.user.id })
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {

        const user = this.state.user
        this.setState({
          user: { ...user, entries: data.entries}
        })
      })
      .catch(console.log) 

    })
    .catch(console.log)
  }

  render() {
    const { isSignedIn, route , imageUrl, boxes, user } = this.state
    const { name, entries } = user
    return (
      <div className="App">
      
        <Particles 
          className="particles"
          params={particleOptions}
        />

        <Navigation onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
      { route === 'home'
        ? <React.Fragment>
            <Logo />
            <Rank entries={entries}
              userName={name}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onPictureSubmit}
            />
            
            <FaceRecognition imageUrl={imageUrl}
              boxes={boxes}
            /> 
          </React.Fragment> 
        : (
          this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          : <Register onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
        )}
      </div>
    );
  }
}

export default App;
