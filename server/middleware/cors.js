module.exports = clientOrigins => (req, res, next) => {
  clientOrigins.forEach(origin => {
    if (req.headers && req.headers.origin && req.headers.origin.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
    }
  })

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type')
  res.header('Access-Control-Allow-Credentials', true)

  next()
}
