import React from 'react'

 const Rank = ({ userName, entries }) => (
  <div>
    <div className="white f3">
      {`Hey ${userName}! Your current Rank is..`}
    </div>    
    <div className="white f1">
      {entries}
    </div>
  </div>
 )

 export default Rank