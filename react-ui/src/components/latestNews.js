import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import NewsItem from './newsItem'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const axios = require('axios')

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: 500,
		height: 450,
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
})

class TitlebarGridList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			checked: false,
			savedNews: [],
			news: [],
			saved: true,
		}
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked })
	}

	addSavedNews = () => {}

	componentDidMount() {
		const userID = localStorage.getItem('userID')
		axios('/api/current_news').then(res => {
			this.setState({ news: res.data.articles })
		})

		axios(`/api/saved_news/${userID}`).then(res => {
			const data = []
			data.push(...res.data)
			this.setState({
				savedNews: data,
			})
		})

		this.setState({
			isAuthenticated: localStorage.getItem('isAuthenticated'),
			given_name: localStorage.getItem('givenName'),
			userImage: localStorage.getItem('picture_url'),
		})
	}

	render() {
		const { classes } = this.props
		const { news } = this.state
		const { savedNews } = this.state

		let newsComponent = news.map(tile => (
			<NewsItem
				news={tile}
				sessionID={this.props.sessionID}
				userID={this.props.userID}
				classes={classes}
				key={tile.urlToImage}
			/>
		))
		if (this.state.checked) {
			newsComponent = savedNews.map(tile => (
				<NewsItem
					news={tile}
					sessionID={this.props.sessionID}
					userID={this.props.userID}
					classes={classes}
					key={tile.urlToImage}
					isSaved={this.state.saved}
				/>
			))
		}
		return (
			<div className={classes.root}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<FormControlLabel
							control={
								<Switch
									checked={this.state.checkedA}
									onChange={this.handleChange('checked')}
									value="checked"
								/>
							}
							label="Saved Articles"
						/>
					</Paper>
				</Grid>
				{newsComponent}
			</div>
		)
	}
}

TitlebarGridList.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TitlebarGridList)
