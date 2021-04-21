const request = require('request')
const config = require('../src/config')

const geoCode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${config.geo_code}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            cb('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            cb('Unable to find location. Try another search', undefined)
        } else {
            cb(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode