import React from 'react'

function NewsItem(props) {
	return (
		<div>
			<img src={props.image} alt="article" />
		</div>
	)
}

export default NewsItem
