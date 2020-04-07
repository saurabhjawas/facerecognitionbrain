import React from 'react'
import Tilt from 'react-parallax-tilt'
import brain from './brain.png'
import './Logo.css'

const Logo = () => (

  <div className="center ma4 mt0">
    <Tilt
      className="Tilt br2 shadow-2" 
      options={{ max : 55 }} 
    >
      <div className="pa3">
        <img
          style={{ paddingTop: '5px'}}
          src={brain}
          alt="brain-logo"
        />
      </div>
    </Tilt>
  </div> 

)

export default Logo

/*
  <div className="ma4 mt0">
     <Tilt
      className="Tilt br2 shadow-2" 
      options={{ max : 55 }} 
    >
      <div className="Tilt-inner pa3">
        <img
          style={{ paddingTop: '5px'}}
          src={brain}
          alt="brain-logo"
        />
      </div>
</Tilt>
  </div> 
*/