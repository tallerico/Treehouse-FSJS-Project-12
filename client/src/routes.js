import React from 'react'
import { Route, Router, Fragment } from 'react-router-dom'
import Initial from './components/initial'
import App from './App'
import AppBar from './components/appBar'
import Home from './Home/Home'
import Callback from './Callback/Callback'
import history from './history'

export const makeMainRoutes = () => {
	return (
		<Fragment>
			<AppBar />
			<Router history={history}>
				<div>
					<Route path="/" render={props => <App auth={auth} {...props} />} />
					<Route path="/home" render={props => <Home auth={auth} {...props} />} />
					<Route
						path="/home"
						render={props => {
							handleAuthentication(props)
							return <Callback {...props} />
						}}
					/>
				</div>
			</Router>
		</Fragment>
	)
}
