import express from 'express';
import proxy from 'express-http-proxy';
import  OpenAI from "openai";
const openai = new OpenAI();

const app = express()
app.use(express.json());
const port = 3000
import cors from "cors"
var corsOptions = {
    origin: 'http://localhost:5173',
}
app.use(cors(corsOptions))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post('/api/submit', (req, res) => {
    const completion = openai.chat.completions.create({
        messages: req.body.messages,
        model: 'gpt-4',
    })
    .then( (response) => {
        res.send(response.choices[0].message );
    })
    .catch( (e) => {
        console.log(e.message);
        res.send({error: e.message} , 500);
    });

})


app.use('/api/', proxy("http://prompt-designer-api:1337", {
    proxyReqPathResolver: function(proxyReq) {
        return '/api' + proxyReq.url
    }
}))


