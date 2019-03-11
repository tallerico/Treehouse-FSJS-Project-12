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
			news: [],
		}
	}

	logout = () => {
		this.setState({ isAuthenticated: false })
		localStorage.clear()
		history.push('/')
	}

	googleResponse = response => {
		const id_token = response.Zi.id_token
		axios
			.post('http://localhost:3001/api/token', {
				token: id_token,
			})
			.then(response => {
				console.log(response)
				localStorage.clear()
				localStorage.setItem('givenName', `${response.data[0]['given_name']}`)
				localStorage.setItem('picture_url', `${response.data[0]['picture_url']}`)
				this.setState({
					isAuthenticated: true,
					given_name: `${response.data[0]['given_name']}`,
					userImage: `${response.data[0]['picture_url']}`,
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
		axios('http://localhost:3001/api/current_news').then(res => {
			this.setState({ news: res.data.articles })
		})

		this.setState({
			given_name: localStorage.getItem('givenName'),
			userImage: localStorage.getItem('picture_url'),
		})
	}

	render() {
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
										news={this.state.news}
										givenName={this.state.given_name}
										isAuthenticated={this.state.isAuthenticated}
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
