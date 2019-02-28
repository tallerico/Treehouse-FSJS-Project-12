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
				clientId="1039345987661-8d3g2ujmet6hvk20bt2i3pjs75vn1cp2.apps.googleusercontent.com"
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
