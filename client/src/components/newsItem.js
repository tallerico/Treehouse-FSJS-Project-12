import React from 'react'
import PropTypes from 'prop-types'
import Link from '@material-ui/core/Link'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

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

function MediaCard(props) {
	const news = props.news
	const { classes } = props

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
					<AddIcon />
				</Fab>
			</CardActions>
		</Card>
	)
}

MediaCard.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MediaCard)
