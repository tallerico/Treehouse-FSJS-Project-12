import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import UserAvatar from './avatar'
import Menu from './menu'

const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	avatar: {
		margin: 10,
	},
	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60,
	},
}

function ButtonAppBar(props) {
	const { classes } = props
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						Dashup
					</Typography>
					<UserAvatar
						classes={props.classes}
						onSuccess={props.googleResponse}
						logout={props.logout}
						userImage={props.userImage}
						firstName={props.firstName}
						isAuthenticated={props.isAuthenticated}
					/>
				</Toolbar>
			</AppBar>
		</div>
	)
}

ButtonAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ButtonAppBar)
