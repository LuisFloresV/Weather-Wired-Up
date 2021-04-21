const request = require('request')

const foreCast = (x, y, cb) => {
    const url = `http://api.weatherstack.com/forecast?access_key=01ffbef3f40e235f6d126936bf15c05f&query=${x},${y}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            cb('Unable to connect to location services', undefined)
        }
        else if (body.error) {
            cb('Unable to find location', undefined)
        }
        else {
            cb(undefined, {
                temp: body.current.temperature,
                feels: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                name: body.location.name,
                country: body.location.country
            })
        }
    })
}

module.exports = foreCast