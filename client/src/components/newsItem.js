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
import { IconButton } from '@material-ui/core'

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
		this.state = {}
	}

	render() {
		const { classes } = this.props
		const { news } = this.props
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
					<Fab color="primary" aria-label="Add" className={classes.fab}>
						<IconButton>
							<AddIcon />
						</IconButton>
					</Fab>
				</CardActions>
			</Card>
		)
	}
}

MediaCard.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MediaCard)
