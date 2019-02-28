import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import Grid from './components/grid'
import './App.css'
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
			firstName: null,
			lastName: null,
			name: null,
			userImg: null,
			email: null,
			token: '',
			news: [],
		}
	}

	logout = () => {
		this.setState({ isAuthenticated: false, token: '', user: null })
	}

	googleResponse = response => {
		this.setState({
			firstName: response.profileObj.givenName,
			lastName: response.profileObj.familyName,
			email: response.profileObj.email,
			userImg: response.profileObj.imageUrl,
			name: response.profileObj.name,
			isAuthenticated: true,
		})
		console.log(response)
	}

	onFailure = error => {
		console.log(error)
	}

	componentDidMount() {
		axios('http://localhost:3001/api/current_news').then(res => {
			this.setState({ news: res.data.articles })
		})
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Grid
					userImage={this.state.userImg}
					firstName={this.state.firstName}
					isAuthenticated={this.state.isAuthenticated}
					googleResponse={this.googleResponse}
					logout={this.logout}
					onFailure={this.onFailure}
					news={this.state.news}
				/>
			</MuiThemeProvider>
		)
	}
}

export default App
