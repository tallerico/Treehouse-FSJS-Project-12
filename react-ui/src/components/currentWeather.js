import React, { Component, Fragment } from 'react'
import WeatherIcon from './weatherIcon'
import '../App.css'
import { css } from '@emotion/core'
import { BounceLoader } from 'react-spinners'
import Typography from '@material-ui/core/Typography'

const axios = require('axios')

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`

class CurrWeather extends Component {
	constructor(props) {
		super(props)
		this.state = {
			temp: '',
			icon: '',
			summary: '',
			loading: true,
		}
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(position => {
			const currLat = position.coords.latitude
			const currLong = position.coords.longitude
			axios.get(`/api/current_weather/${currLat},${currLong}`).then(res => {
				this.setState({
					temp: Math.trunc(res.data.temp),
					icon: res.data.icon.replace(/-/g, '_').toUpperCase(),
					summary: res.data.summary,
					loading: false,
				})
			})
		})
	}

	render(props) {
		if (!this.state.loading) {
			return (
				<Fragment>
					<WeatherIcon icon={this.state.icon} />
					<Typography variant="h6" color="inherit">
						{this.state.summary}
					</Typography>
					<Typography variant="h6" color="inherit">
						{this.state.temp} degrees
					</Typography>
				</Fragment>
			)
		}
		return (
			<BounceLoader
				css={override}
				sizeUnit={'px'}
				size={150}
				color={'#2196f3'}
				loading={this.state.loading}
			/>
		)
	}
}

export default CurrWeather
