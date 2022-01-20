const express = require('express')
const router = express.Router()
const xray = require('x-ray')()
const tabletojson = require('tabletojson').Tabletojson
const randomColor = require('randomcolor')

// GET all tables from wiki URL
router.get('/', async (req, res) => {
  // using xray instead of something like puppeteer to save time
  // i'm using the table.wikitable selector so i dont have to sort through irrelevent tables
  // there are also tables with the class 'toccolours' but i have chosen to ignore those
  // because tabletojson has trouble with them
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
      return mapStructure(tabletojson.convert('<table>' + table + '</table>'))
    }).filter(hasNumericCol)
    res.json(jsonTables)
  })
})

// ok so this method is very much array-method-ception and i have no doubt
// it would be pretty slow on big datasets so this would be one of the first
// areas i would direct my attention for cleaning up the code 
const mapStructure = function (table) {
  // something funny happens if a table isn't formatted perfectly
  // e.g. some tables are like <table><caption></caption>...</table> and
  // then the json is like [[{},{},{}]]
  if (table?.[0] && Array.isArray(table[0])) {
    table = table[0]
  }

  let firstRow = table?.[0] || {}
  let datasets = {}
  let labels = {}

  Object.keys(firstRow).forEach(key => {
    let value = firstRow[key]
    const parsedNumber = parseLocaleNumber(value)
    const isDateValue = isDate(key)
    const isNumeric = !isDateValue && !isNaN(parsedNumber)
    if (isNumeric) {
      datasets[key] = []
    } else {
      labels[key] = []
    }
  })

  table.forEach(row => {
    Object.keys(row).forEach(key => {
      if (datasets[key]) {
        datasets[key].push(parseLocaleNumber(row[key]))
      } else if (labels[key]) {
        labels[key].push(row[key])
      }
    })
  })

  return {
    datasets: Object.keys(datasets).map(key => {
      return {
        label: key,
        data: datasets[key],
        backgroundColor: randomColor()
      }
    }),
    labels
  }
}

const hasNumericCol = function (table) {
  return table.datasets?.length > 0
}

// need to check if a field is a date before a number - some dates can be
// parsed as numeric (ie years)
// using an array of common date keys and matching against the name of the column
// can determine if a field is a date a majority of the time. this method is
// of course not infallible though...
// Wikipedia has a few acceptable date formats (https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Dates_and_numbers)
// i would generally parse the date to figure it out but for the purpose
// of this test I'm just keeping it super basic...
const isDate = function (fieldName = '') {
  const dateKeys = ['year', 'month', 'date']
  return dateKeys.some(key => fieldName.toLowerCase().includes(key))
}

// stole this from stack overflow, does a decent job of 'unformatting' most numbers
const parseLocaleNumber = function (stringNumber, locale = 'en') {
  var thousandSeparator = Intl.NumberFormat(locale).format(11111).replace(/\p{Number}/gu, '')
  var decimalSeparator = Intl.NumberFormat(locale).format(1.1).replace(/\p{Number}/gu, '')

  return parseFloat(stringNumber
      .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
      .replace(new RegExp('\\' + decimalSeparator), '.')
  )
}

module.exports = router
