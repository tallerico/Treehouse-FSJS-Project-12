import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { GoogleLogin } from 'react-google-login'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

function userAvatar(props) {
	const { classes } = props

	if (props.isAuthenticated) {
		return (
			<div className="container_avatar">
				<Grid container justify="center" alignItems="center">
					<Avatar alt={props.firstName} src={props.userImage} className={classes.avatar} />
				</Grid>
				<Button onClick={props.logout} color="inherit">
					Logout
				</Button>
			</div>
		)
	} else {
		return (
			<GoogleLogin
				clientId=`process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID`
				render={renderProps => (
					<Button onClick={renderProps.onClick} color="inherit">
						Login
					</Button>
				)}
				onSuccess={props.onSuccess}
				onFailure={props.onFailure}
			/>
		)
	}
}

userAvatar.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default userAvatar
