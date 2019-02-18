import React from 'react'
import ReactDOM from 'react-dom'
import GoogleLogin from 'react-google-login'

const responseGoogle = response => {
	console.log(response)
}

ReactDOM.render(
	<GoogleLogin
		clientId=REACT_APP_GOOGLE_LOGIN_CLIENT_ID
		buttonText="Login"
		onSuccess={responseGoogle}
		onFailure={responseGoogle}
	/>,
	document.getElementById('googleButton'),
)

