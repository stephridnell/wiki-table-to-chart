const express = require('express')
const router = express.Router()
const xray = require('x-ray')()
const tabletojson = require('tabletojson').Tabletojson

// GET all tables from wiki URL
router.get('/', async (req, res) => {
  // using xray instead of something like puppeteer to save time
  // i'm using the table.wikitable selector so i dont have to sort through irrelevent tables
  // there are also tables with the class 'toccolours' but i have chosen to ignore those
  // the '@html' returns the innerHTML of the whole table, without this xray will return the innerText by default
  xray(req.query.url, ['table.wikitable@html'])(function(err, tables) {
    if (err) {
      res.status(500).json({
        message: 'Error scraping url',
        error
      })
    }
    const jsonTables = tables.map(table => {
      // xray only returns the innerHTML of the table so to use the tabletojson library
      // i wrapped it in <table> tags
      return tabletojson.convert('<table>' + table + '</table>')
    }).filter(hasNumericCol)
    res.json(jsonTables)
  })
})

const hasNumericCol = function (table) {
  // something funny happens if a table isn't formatted perfectly
  // e.g. some tables are like <table><caption></caption>...</table> and
  // then the json is like [[{},{},{}]]
  if (table?.[0] && Array.isArray(table[0])) {
    table = table[0]
  }
  table.map(el => {
    Object.values(el).forEach(e => {
      console.log(e, parseLocaleNumber(e))
    })
  })
  return true
}

// stole this from stack overflow
function parseLocaleNumber(stringNumber, locale = 'en') {
  var thousandSeparator = Intl.NumberFormat(locale).format(11111).replace(/\p{Number}/gu, '')
  var decimalSeparator = Intl.NumberFormat(locale).format(1.1).replace(/\p{Number}/gu, '')

  return parseFloat(stringNumber
      .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
      .replace(new RegExp('\\' + decimalSeparator), '.')
  )
}

module.exports = router
