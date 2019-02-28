import React from 'react'
import Typography from '@material-ui/core/Typography'
import '../App.css'

function Welcome(props) {
	const d = new Date()
	const currHour = d.getHours()

	if (props.isAuthenticated && currHour >= 0 && currHour < 12) {
		return (
			<Typography variant="h4" color="inherit">
				Good Morning, {props.firstName}!
			</Typography>
		)
	}

	if (props.isAuthenticated && currHour >= 12 && currHour < 17) {
		return (
			<Typography variant="h4" color="inherit">
				Good Afternoon, {props.firstName}!
			</Typography>
		)
	}

	if (props.isAuthenticated && currHour >= 17 && currHour <= 24) {
		return (
			<Typography variant="h4" color="inherit">
				Good Evening, {props.firstName}!
			</Typography>
		)
	}

	return (
		<Typography variant="h4" color="inherit">
			Hello!
		</Typography>
	)
}

export default Welcome
