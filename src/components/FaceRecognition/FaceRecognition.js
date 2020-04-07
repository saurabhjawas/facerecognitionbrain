import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, boxes }) => (
  <div className="center ma">
    <div className="absolute mt2">
      <img src={imageUrl}
        id="inputimage"
        alt="random" 
      />      
      {
        boxes.map((box, index) => (
          <div  key={index}
            className="bounding-box"
            style={{ 
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol
            }}
          ></div>
        ))      
      }
      </div>
  </div>
)

export default FaceRecognition