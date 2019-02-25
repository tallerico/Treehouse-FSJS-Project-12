import React from 'react'
import Typography from '@material-ui/core/Typography'
import '../App.css'

function Welcome(props) {
	const d = new Date()
	const currHour = d.getHours()

	if (props.isAuthenticated && currHour >= 0 && currHour < 12) {
		return (
			<div className="container_welcome">
				<Typography variant="h4" color="inherit">
					Good Morning, {props.firstName}!
				</Typography>
			</div>
		)
	}

	if (props.isAuthenticated && currHour >= 12 && currHour < 17) {
		return (
			<div className="container_welcome">
				<Typography variant="h4" color="inherit">
					Good Afternoon, {props.firstName}!
				</Typography>
			</div>
		)
	}

	if (props.isAuthenticated && currHour >= 17 && currHour <= 24) {
		return (
			<div className="container_welcome">
				<Typography variant="h4" color="inherit">
					Good Evening, {props.firstName}!
				</Typography>
			</div>
		)
	}

	return (
		<div className="container_welcome">
			<Typography variant="h4" color="inherit">
				Hello!
			</Typography>
		</div>
	)
}

export default Welcome
