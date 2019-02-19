import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import AppBar from './components/appBar'

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
			user: null,
			token: '',
			userLocation: {
				lat: '',
				long: '',
			},
		}
	}

	logout = () => {
		this.setState({ isAuthenticated: false, token: '', user: null })
	}

	googleResponse = response => {
		console.log(response)
	}

	onFailure = error => {
		console.log(error)
	}

	setLocation = (lat, long) => {
		this.setState({
			userLocation: {
				lat: lat,
				long: long,
			},
		})
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(function(position) {
			this.setLocation(position.coords.latitude, position.coords.longitude)
			console.log(position.coords.latitude, position.coords.longitude)
		})
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<AppBar
					googleResponse={this.googleResponse}
					logout={this.logout}
					onFailure={this.onFailure}
				/>
			</MuiThemeProvider>
		)
	}
}

export default App
