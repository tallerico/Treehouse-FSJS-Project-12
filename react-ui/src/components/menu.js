import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = theme => ({
	root: {
		display: 'flex',
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	paper: {
		marginRight: theme.spacing.unit * 2,
	},
})

class MenuListComposition extends React.Component {
	state = {
		open: false,
	}

	handleToggle = () => {
		this.setState(state => ({ open: !state.open }))
	}

	handleClose = event => {
		if (this.anchorEl.contains(event.target)) {
			return
		}

		this.setState({ open: false })
	}

	render() {
		const { classes } = this.props
		const { open } = this.state
		return (
			<div className={classes.root}>
				<div>
					<IconButton
						buttonRef={node => {
							this.anchorEl = node
						}}
						aria-owns={open ? 'menu-list-grow' : undefined}
						aria-haspopup="true"
						onClick={this.handleToggle}
					>
						<MenuIcon />
					</IconButton>
					<Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
						{({ TransitionProps, placement }) => (
							<Grow
								{...TransitionProps}
								id="menu-list-grow"
								style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
							>
								<Paper>
									<ClickAwayListener onClickAway={this.handleClose}>
										<MenuList>
											<MenuItem onClick={this.handleClose}>
												<Link to="/home">Home</Link>
											</MenuItem>
											<MenuItem onClick={this.handleClose}>Saved Articles</MenuItem>
										</MenuList>
									</ClickAwayListener>
								</Paper>
							</Grow>
						)}
					</Popper>
				</div>
			</div>
		)
	}
}

MenuListComposition.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MenuListComposition)
