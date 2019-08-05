import React, { Component } from 'react'
import axios from 'axios'
require('dotenv').config()
const { IP_INFO_KEY, WEATHER_APP_KEY } = process.env

class Weather extends Component {
    constructor() {
        super()
        this.state = {
            location: {},
            weatherData: {
                main: {},
                weather: {}
            },
            weatherDescription: ''

        }
    }

    componentDidMount() {
        axios
            .get(``).then(res => {
                this.setState({ location: res.data }, () => this.getLocalWeather())
            })
            .catch(err => {
                console.log('error with API calls', err)
            })

    }

    getLocalWeather = () => {
        const { location } = this.state
        axios
            .get(``).then(res => {
                this.setState({ weatherData: res.data }, () => {
                    const { weatherData } = this.state
                    this.setState({ weatherDescription: weatherData.weather[0].description })
                })
            })
            .catch(err => {
                console.log('error with weather API call', err)
            })
    }

    getWeatherIcon = () => {
        const { weatherDescription } = this.state
        // let description = 'Loading...'
        // if (weatherData.weather[0].description) description = weatherData.weather[0].description
        if (weatherDescription === 'clear sky') {
            console.log('Clear Skies Today!')
            return < i className="far fa-sun" title='Clear Skies' />
        } else if (weatherDescription === 'few clouds') {
            console.log('Few Clouds Today!')
            return <i className="fas fa-cloud-sun" title='Few Clouds' />
        } else if (weatherDescription === 'scattered clouds') {
            console.log('Scattered Clouds Today!')
            return <i className="fas fa-cloud" title='Scattered Clouds' />
        } else if (weatherDescription === 'broken clouds') {
            console.log('Broken Clouds Today!')
            return <i className="fas fa-cloud" title='Broken Clouds' />
        } else if (weatherDescription === 'overcast clouds') {
            return <i className='fas fa-cloud' title='Overcast Clouds' />
        } else if (weatherDescription === 'shower rain') {
            console.log('Shower Rain Today!')
            return <i className="fas fa-cloud-showers-heavy" title='Shower Rain' />
        } else if (weatherDescription === 'heavy intensity rain') {
            console.log('High intensity rain')
            return <i className="fas fa-cloud-showers-heavy" title='High Intensity Rain' />
        } else if (weatherDescription === 'rain') {
            console.log('Rain Today!')
            return <i className="fas fa-cloud-rain" title='Rain' />
        } else if (weatherDescription === 'light rain') {
            console.log('Light Rain!')
            return <i className='fas fa-cloud-rain' title='Light Rain' />
        } else if (weatherDescription === 'moderate rain') {
            return <i className='fas fa-cloud-rain' title='Moderate Rain' />
        } else if (weatherDescription === 'thunderstorm') {
            console.log('Thunderstorms!')
            return <i className="fas fa-poo-storm" title='Thunderstorm' />
        } else if (weatherDescription === 'snow') {
            console.log(`It's snowing!`)
            return <i className="far fa-snowflake" title='Snow' />
        } else if (weatherDescription === 'mist') {
            console.log('Foggy Day..')
            return <i className="fas fa-smog" title='Misty' />
        } else if (weatherDescription === 'haze') {
            console.log('Hazy')
            return <i className="fas fa-smog" title='Hazy' />
        } else {
            return <i className="far fa-sad-tear" title='Unknown' />
        }
    }



    render() {
        const { weatherData, location, date } = this.state
        let temperature = 'Loading...'
        if (weatherData.main.temp) temperature = ((9 / 5) * (weatherData.main.temp - 273.15) + 32).toFixed(0)
        console.log(weatherData.main)
        console.log(weatherData)
        console.log(location)
        return (
            <div className='weather-time-container'>
                <section className='weather-widget'>
                    <h3> {this.getWeatherIcon()} {temperature} &#176;</h3>
                    <h3>{location.city}, {location.region}</h3>
                </section>
            </div>
        )
    }
}

export default Weather