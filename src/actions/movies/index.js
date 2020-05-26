const { createReadStream, createWriteStream, existsSync } = require('fs'),
  { join } = require('path'),
  ProgressBar = require('progress'),
  cosmetic = require('cosmetic'),
  parse = require('csv-parse'),
  { lib, models } = require('@gameroom/emporium'),
  { Option_Group, Price, Price_Option_Group, Product, Tag } = models,
  fastcsv = require('fast-csv'),
  { Import } = require('../../models'),
  typos = require('./typos'),
  { separateOptions, removeOptionsFromName } = require('./options'),
  createProduct = require('./createProduct'),
  createTags = require('./createTags'),
  createProperties = require('./createProperties'),
  createPrices = require('./createPrices'),
  types = require('./types'),
  { createDirectories, pad, prepairForCsv, saveImportFiles, saveImportFilesToCSV } = require('../../helpers')

const catalogsChildren = {},
  catalogs = {},
  keys = []

let games = 0,
  i = 0

let option_group_stream,
  product_stream,
  price_stream,
  price_option_group_stream,
  tag_stream

const option_group_keys = Object.keys(new Option_Group()),
  product_keys = Object.keys(new Product()),
  price_keys = Object.keys(new Price()),
  price_option_group_keys = Object.keys(new Price_Option_Group()),
  tag_keys = Object.keys(new Tag())

const switchover = (options) => {
  return new Promise ((resolve, reject) => {
    // setup csv files to save to
    let dir = options._parents.switchover.dir || './switchover'
    dir = join(dir, 'movies')
    // create csv streams
    option_group_stream = createWriteStream(join(dir, 'option_groups.csv'))
    product_stream = createWriteStream(join(dir, 'products.csv'))
    price_stream = createWriteStream(join(dir, 'prices.csv'))
    price_option_group_stream = createWriteStream(join(dir, 'price_option_groups.csv'))
    tag_stream = createWriteStream(join(dir, 'tags.csv'))
    // write key columns
    option_group_stream.write(`${option_group_keys.join()}\n`)
    product_stream.write(`${product_keys.join()}\n`)
    price_stream.write(`${price_keys.join()}\n`)
    price_option_group_stream.write(`${price_option_group_keys.join()}\n`)
    tag_stream.write(`${tag_keys.join()}\n`)
    // read csv
    createReadStream(options.file)
      .pipe(parse({delimiter: ','}))
      .on('data', async (row) => {
        process.stdout.write(`${i}\r`)
        if (keys.length === 0) {
          for (const key of row) keys.push(key.toLowerCase())
        } else {
          const object = parseRow(row)
          if (object.genre === 'Games') return games++
          const data = await makeObject(object)
          pipeToFile(data)
        }
        i++
      })
      .on('end', () => console.log('success!'))
  })
}
const pipeToFile = (data) => {
  prepairForCsv(data)
  const {
    option_groups,
    prices,
    price_option_groups,
    products,
    tags
  } = data
  for (const row of option_groups) {
    const values = []
    for (const key of option_group_keys) values.push(row[key])
    option_group_stream.write(`${values.join()}\n`)
  }
  for (const row of prices) {
    const values = []
    for (const key of price_keys) values.push(row[key])
    price_stream.write(`${values.join()}\n`)
  }
  for (const row of price_option_groups) {
    const values = []
    for (const key of price_option_group_keys) values.push(row[key])
    price_option_group_stream.write(`${values.join()}\n`)
  }
  for (const row of products) {
    const values = []
    for (const key of product_keys) values.push(row[key])
    product_stream.write(`${values.join()}\n`)
  }
  for (const row of tags) {
    const values = []
    for (const key of tag_keys) values.push(row[key])
    tag_stream.write(`${values.join()}\n`)
  }
}
const parseRow = (row) => {
  const object = {}
  for (const [index, key] of keys.entries()) object[key] = row[index]
  return object
}
const makeObject = (object) => {
  // typos
  typos.title(object)
  typos.genre(object)
  // name is title
  object.name = object['dvd_title']
  // options
  object.options = ''
  removeOptionsFromName(object)
  if (object.options) {
    object = separateOptions(object)
  } else {
    object.type = ['DVD']
  }
  // discs
  if (object.discs == 1) getDiscsFromType(object)
  // product
  const product = createProduct(object)
  // tags
  const { product_tags, tags } = createTags(object, product)
  product.tags = product_tags

  product.properties = createProperties(object, product)

  const { optionGroups, prices, priceOptionGroups } = createPrices(object, product)

  return {
    option_groups: optionGroups,
    prices,
    price_option_groups: priceOptionGroups,
    products: [ product ],
    tags
  }
  // return results
}
let getCatalog = (object, product) => {
  let catalog
  if (object.type.includes('Blu-ray')) {
    catalog = 'blurays'
  } else if (object.type.includes('UMD')) {
    catalog = 'umds'
  } else {
    catalog = product.name.charAt(0).toLowerCase()
    if (!catalog.match(/[a-z]/i)) catalog = 'num'
  }
  return catalog
}
const getDiscsFromType = (object) => {
  object.discs = object.type.length
  if (object.type.includes('Book')) --object.discs
  if (object.type.includes('Booklet')) --object.discs
  if (object.type.includes('Digital Copy')) --object.discs
  if (object.type.includes('4k')) --object.discs
  return object
}
const getDiscsFromName = (object) => {
  let name = object.name
  let count = 0
  while (name.includes('/')) {
    name = name.replace('/', '')
    count++
  }
  object.discs += count
  return object
}


module.exports = switchover
