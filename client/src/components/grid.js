import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CurrentWeather from './currentWeather'
import Welcome from './welcome'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LatestNews from './latestNews'
import Typography from '@material-ui/core/Typography'

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
	if (props.isAuthenticated) {
		return (
			<div className={classes.root}>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Welcome isAuthenticated={props.isAuthenticated} firstName={props.givenName} />
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<CurrentWeather />
						</Paper>
					</Grid>
					<LatestNews sessionID={props.sessionID} userID={props.userID} />
				</Grid>
			</div>
		)
	}

	return (
		<div className={classes.root}>
			<Grid container spacing={24}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Typography variant="subtitle1" gutterBottom>
							Please sign in to access your personal dashboard.
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</div>
	)
}

FullWidthGrid.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FullWidthGrid)
