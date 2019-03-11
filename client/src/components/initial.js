import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

function initialWelcome(props) {
	return (
		<div className="container_welcome">
			<Typography variant="h2" color="inherit" gutterBottom>
				Welcome to Dashup!
			</Typography>
			<Typography variant="subtitle1" gutterBottom>
				Your one stop shop for today's news and weather. Sign in at the top.
			</Typography>
		</div>
	)
}

export default initialWelcome
