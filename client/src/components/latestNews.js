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
		width: '100%',
	},
})

class TitlebarGridList extends Component {
	constructor(props) {
		super(props)
		this.saveStory = this.saveStory.bind(this)
		this.deleteStory = this.deleteStory.bind(this)
		this.state = {
			checked: false,
			savedNews: [],
			news: [],
			saved: false,
			sessionID: '',
			userID: '',
		}
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked })
	}

	deleteStory(event) {
		let { savedNews } = this.state
		axios
			.post('http://localhost:3001/api/delete_story', {
				id: savedNews[event.currentTarget.id]._id,
			})
			.then(res => {
				if (res.status === 200) {
					savedNews.splice(event.currentTarget.id, 1)
					this.setState({
						savedNews: savedNews,
					})
				}
			})
	}

	saveStory(event) {
		axios
			.post('http://localhost:3001/api/saved_story', {
				urlToImage: this.state.news[event.currentTarget.id].urlToImage,
				title: this.state.news[event.currentTarget.id].title,
				url: this.state.news[event.currentTarget.id].url,
				sessionID: this.state.sessionID,
				userID: this.state.userID,
			})
			.then(res => {
				this.state.savedNews.push(res.data)
			})
	}

	componentDidMount() {
		const userID = localStorage.getItem('userID')
		axios('http://localhost:3001/api/current_news').then(res => {
			this.setState({ news: res.data.articles })
		})

		axios(`http://localhost:3001/api/saved_news/${userID}`).then(res => {
			const data = []
			data.push(...res.data)
			this.setState({
				savedNews: data,
			})
		})

		this.setState({
			sessionID: this.props.sessionID,
			userID: this.props.userID,
		})
	}

	render() {
		// Use other to capture only the props you're not using in List
		const { classes, root, gridList, icon, paper, ...other } = this.props

		const { news } = this.state
		const { savedNews } = this.state

		let newsComponent = news.map((tile, index) => (
			<NewsItem {...other} news={tile} key={index} listId={index} saveStory={this.saveStory} />
		))
		if (this.state.checked) {
			newsComponent = savedNews.map((tile, index) => (
				<NewsItem
					news={tile}
					id={tile._id}
					sessionID={this.props.sessionID}
					userID={this.props.userID}
					{...other}
					key={tile._id}
					listId={index}
					saved={this.state.saved}
					deleteStory={this.deleteStory}
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
