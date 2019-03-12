import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import NewsItem from './newsItem'

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
})

function TitlebarGridList(props) {
	const { classes } = props
	const news = props.news

	return (
		<div className={classes.root}>
			{news.map(tile => (
				<NewsItem news={tile} classes={classes} key={tile.urlToImage} />
			))}
		</div>
	)
}

TitlebarGridList.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TitlebarGridList)
