import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from '@material-ui/core/Link'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'
const axios = require('axios')

const styles = theme => ({
	card: {
		maxWidth: 345,
		marginBottom: 12,
	},
	media: {
		height: 140,
	},
	link: {
		margin: theme.spacing.unit,
	},
	fab: {
		margin: theme.spacing.unit,
	},
})

class MediaCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			urlToImage: '',
			title: '',
			url: '',
			saved: false,
			sessionID: '',
			userID: '',
		}
	}

	saveStory = () => {
		if (this.state.sessionID && !this.state.saved) {
			axios
				.post('/api/saved_story', {
					urlToImage: this.state.urlToImage,
					title: this.state.title,
					url: this.state.url,
					sessionID: this.state.sessionID,
					userID: this.state.userID,
				})
				.then(res => {
					if (res.status === 204) {
						console.log('true')
						this.setState({
							saved: true,
						})
					}
				})
		} else {
			alert('Article already saved')
		}
	}

	componentDidMount() {
		this.setState({
			urlToImage: this.props.news.urlToImage,
			title: this.props.news.title,
			url: this.props.news.url,
			sessionID: this.props.sessionID,
			userID: this.props.userID,
		})
		if (this.props.isSaved) {
			this.setState({
				saved: true,
			})
		}
	}

	render() {
		const { classes } = this.props
		const { news } = this.props
		let isSaved
		let icon = (
			<Fab color="primary" aria-label="Add" className={classes.fab}>
				<IconButton>
					<AddIcon onClick={this.saveStory} />
				</IconButton>
			</Fab>
		)

		if (this.state.saved) {
			icon = (
				<Fab color="primary" aria-label="Add" className={classes.fab}>
					<IconButton>
						<DeleteIcon onClick={this.deleteStory} />
					</IconButton>
				</Fab>
			)
		}

		return (
			<Card className={classes.card}>
				<CardActionArea>
					<CardMedia className={classes.media} image={news.urlToImage} title={news.title} />
					<CardContent>
						<Typography gutterBottom variant="h6" component="h2">
							{news.title}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Typography>
						<Link href={news.url} className={classes.link}>
							Read
						</Link>
					</Typography>
					{icon}
				</CardActions>
			</Card>
		)
	}
}

MediaCard.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MediaCard)
