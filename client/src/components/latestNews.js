import React from 'react'
import NewsItem from './newsItem'

const LatestNews = props => {
	const news = props.news

	return (
		<div className="container_news">
			{news.map((story, index) => (
				<NewsItem key={story.urlToImage} image={story.urlToImage} />
			))}
		</div>
	)
}

export default LatestNews
