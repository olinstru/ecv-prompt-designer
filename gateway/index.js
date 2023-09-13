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


app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post('/api/submit', (req, res) => {
    const promptText = `You will act as a ${req.body.data.attributes.role}.  ${req.body.data.attributes.context}   ${req.body.data.attributes.constraints } ${req.body.data.attributes.defaultInput } `
    const completion = openai.chat.completions.create({
        messages: [{ role: 'user', content: promptText }],
        model: 'gpt-4',
    })
    .then( (response) => {
        res.send(response.choices[0].message );
    })
    .catch( (e) => {
        console.log(e.message);
        res.send({error: e.message} , 500);
    });

    console.log(completion.choices);

})


app.use('/api/', proxy("http://prompt-designer-api:1337", {
    proxyReqPathResolver: function(proxyReq) {
        return '/api' + proxyReq.url
    }
}))


