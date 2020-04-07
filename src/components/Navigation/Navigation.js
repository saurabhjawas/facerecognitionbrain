import React from 'react'
// import './Navigation.css'

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (   
    <nav
      style={{ display: 'flex', justifyContent: 'flex-end'}}
    >
    {
      isSignedIn
      ? (
        <p className="f3 link dim black underline pa3 pointer"
          onClick={() => { onRouteChange('signout') }}
        >
          Sign Out
        </p>
      ) : (
        <React.Fragment>
          <p className="f3 link dim black underline pa3 pointer"
            onClick={() => { onRouteChange('register') }}
          >
            Register
          </p>
          
          <p className="f3 link dim black underline pa3 pointer"
            onClick={() => { onRouteChange('signin') }}
          >
            Sign In
          </p>
        </React.Fragment>
      )
    }
    </nav>
)}

export default Navigation