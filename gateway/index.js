const express = require('express')
const proxy = require('express-http-proxy')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use('/api/', proxy("http://localhost:1337", {
    proxyReqPathResolver: function(proxyReq) {
        return '/api' + proxyReq.url
    }
}))

