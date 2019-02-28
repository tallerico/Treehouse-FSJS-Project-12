import React from 'react'
import PropTypes from 'prop-types'
import AppBar from './appBar'
import { withStyles } from '@material-ui/core/styles'
import CurrentWeather from './currentWeather'
import Welcome from './welcome'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LatestNews from './latestNews'

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
})

function FullWidthGrid(props) {
	const { classes } = props

	return (
		<div className={classes.root}>
			<AppBar
				userImage={props.userImage}
				firstName={props.firstName}
				isAuthenticated={props.isAuthenticated}
				googleResponse={props.googleResponse}
				logout={props.logout}
				onFailure={props.onFailure}
			/>
			<Grid container spacing={24}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Welcome isAuthenticated={props.isAuthenticated} firstName={props.firstName} />
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<CurrentWeather />
					</Paper>
				</Grid>
				<LatestNews news={props.news} />
			</Grid>
		</div>
	)
}

FullWidthGrid.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FullWidthGrid)
