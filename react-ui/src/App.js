import React, { Component, Fragment } from 'react'
import { Route, Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import AppBar from './components/appBar'
import Grid from './components/grid'

import InitiailWelcome from './components/initial'
import './App.css'
import history from './history'
const axios = require('axios')

const theme = createMuiTheme({
	palette: {
		primary: { main: blue[500] }, // Purple and green play nicely together.
		secondary: { main: blue[300] }, // This is just green.A700 as hex.
	},
	typography: {
		useNextVariants: true,
	},
})

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isAuthenticated: false,
			given_name: '',
			userImage: '',
			sessionID: '',
			userID: '',
		}
	}

	logout = () => {
		axios('/api/logout', {
			sessionID: this.state.sessionID,
		}).then(res => {
			this.setState({
				isAuthenticated: false,
				given_name: '',
				userImage: '',
				sessionID: '',
				userID: '',
			})
			localStorage.clear()
			history.push('/')
		})
	}

	googleResponse = response => {
		const id_token = response.Zi.id_token
		axios
			.post('/api/token', {
				token: id_token,
			})
			.then(response => {
				console.log(response)
				localStorage.clear()
				localStorage.setItem('givenName', `${response.data.docs[0]['given_name']}`)
				localStorage.setItem('picture_url', `${response.data.docs[0]['picture_url']}`)
				localStorage.setItem('sessionID', `${response.data.sessionID}`)
				localStorage.setItem('userID', `${response.data.docs[0]['_id']}`)
				localStorage.setItem('isAuthenticated', `true`)

				this.setState({
					isAuthenticated: true,
					given_name: `${response.data.docs[0]['given_name']}`,
					userImage: `${response.data.docs[0]['picture_url']}`,
					sessionID: `${response.data.sessionID}`,
					userID: `${response.data.docs[0]['_id']}`,
				})
				history.push('/home')
			})

		this.setState({
			isAuthenticated: true,
		})
		// console.log(response)
	}

	onFailure = error => {
		console.log(error)
	}

	componentDidMount() {
		this.setState({
			isAuthenticated: localStorage.getItem('isAuthenticated'),
			given_name: localStorage.getItem('givenName'),
			userImage: localStorage.getItem('picture_url'),
			sessionID: localStorage.getItem('sessionID'),
			userID: localStorage.getItem('userID'),
		})
	}

	render() {
		if (this.state.isAuthenticated) {
			history.push('/home')
		}
		return (
			<Fragment>
				<MuiThemeProvider theme={theme}>
					<AppBar
						googleResponse={this.googleResponse}
						logout={this.logout}
						userImage={this.state.userImage}
						givenName={this.state.given_name}
						isAuthenticated={this.state.isAuthenticated}
					/>
					<Router history={history}>
						<div>
							<Route exact path="/" render={props => <InitiailWelcome />} />
							<Route
								path="/home"
								render={props => (
									<Grid
										googleResponse={this.googleResponse}
										logout={this.logout}
										onFailure={this.onFailure}
										givenName={this.state.given_name}
										isAuthenticated={this.state.isAuthenticated}
										sessionID={this.state.sessionID}
										userID={this.state.userID}
									/>
								)}
							/>
						</div>
					</Router>
				</MuiThemeProvider>
			</Fragment>
		)
	}
}

export default App
