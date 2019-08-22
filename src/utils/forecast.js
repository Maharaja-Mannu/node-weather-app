const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d8c23f08dc8c52dc24c895dbffea8365/' + latitude + ',' + longitude + '?units=si'
    // using es-6 object destructure
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to fetch result', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degree celcius and chance of rain is ' + body.currently.precipProbability + ' %.')
        }
    })
}

module.exports = forecast