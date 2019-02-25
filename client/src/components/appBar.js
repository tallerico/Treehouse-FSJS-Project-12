import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import UserAvatar from './avatar'

const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
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
