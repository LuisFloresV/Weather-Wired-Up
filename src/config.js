require('dotenv').config()

const config = {
  geo_code: process.env.GEO_CODE,
  fore_cast: process.env.FORE_CAST
}

module.exports = config