import React from 'react'

class Signin extends React.Component { 
  constructor() {
    super()
    this.state = {
      signInEmail: '',
      signInPassword: '',
      signInError: false
    }
  }

  onEmailChange = (event) => {
    this.setState({
      signInEmail: event.target.value
    })
  }

  onPasswordChange  = (event) => {
    this.setState({
      signInPassword: event.target.value
    })
  }

  onSubmitSignIn = (event) => {
    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ 
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      // {message: "SIGNIN_FAILURE"}
      if (data.signInStatus === "SIGNIN_SUCCESS") {
        this.props.loadUser(data.user)
        this.props.onRouteChange('home')
      } else {
        this.setState({
          signInError: data
        })
        // console.log(data);
      }
      // console.log(data);
    })
  }

  render() {
    const { onRouteChange } = this.props

    return  (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmitSignIn}
              />
            </div>
            <div className="lh-copy mt3">
              <p className="f6 link dim black db pointer"
                onClick={() => {onRouteChange('register')}}
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Signin