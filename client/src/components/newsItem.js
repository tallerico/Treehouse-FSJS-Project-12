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
		this.setSaved = this.setSaved.bind(this)
		this.state = {
			urlToImage: '',
			title: '',
			url: '',
			setSaved: false,
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
	}

	setSaved(event) {
		this.props.saveStory(event)
		this.setState({
			setSaved: true,
		})
	}

	render() {
		const { classes, root, gridList, paper } = this.props
		const { news } = this.props

		let icon = (
			<Fab
				color="primary"
				aria-label="Add"
				className={classes.fab}
				onClick={this.setSaved}
				id={this.props.listId}
			>
				<AddIcon />
			</Fab>
		)

		if (!this.props.deleteStory && this.state.setSaved) {
			icon = null
		}

		if (this.props.deleteStory) {
			icon = (
				<Fab
					onClick={this.props.deleteStory}
					color="primary"
					aria-label="Add"
					className={classes.fab}
					id={this.props.listId}
				>
					<DeleteIcon />
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
