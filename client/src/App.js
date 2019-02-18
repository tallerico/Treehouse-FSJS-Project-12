import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import SimpleMenu from './components/menu'
import AppBar from './components/appBar'

const theme = createMuiTheme({
	palette: {
		primary: { main: blue[500] }, // Purple and green play nicely together.
		secondary: { main: blue[300] }, // This is just green.A700 as hex.
	},
})

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<AppBar />
			</MuiThemeProvider>
		)
	}
}

export default App
