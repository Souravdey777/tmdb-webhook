'use strict';
const express = require('express');
const bodyParser = require('body-parser');
var unirest = require("unirest");
let errorResposne = {
    results: []
};
var port = process.env.PORT || 8080;
// create serve and configure it.
const server = express();
server.use(bodyParser.json());

server.get('/getName', function (req, res) {
    res.send('Swarup Bam');
});

server.post('/getMovies', function (request, response) {
    if (request.body.result.parameters['top-rated']) {
        var req = unirest("GET", "https://api.themoviedb.org/3/movie/top_rated");
        req.query({
            "page": "1",
            "language": "en-US",
            "api_key": "6ed9d94bd9ea7880be31f354d69cc925"
        });
        req.send("{}");
        req.end(function (res) {
            if (res.error) {
                response.setHeader('Content-Type', 'application/json');
                response.send(JSON.stringify({
                    "speech": "Error. Can you try it again ? ",
                    "displayText": "Error. Can you try it again ? "
                }));
            } else if (res.body.results.length > 0) {
                let result = res.body.results;
                let output = '';
                for (let i = 0; i < result.length; i++) {
                    output += result[i].title;
                    output += "\n"
                }
                response.setHeader('Content-Type', 'application/json');
                response.send(JSON.stringify({
                    "speech": output,
                    "displayText": output
                }));
                console.log(response)
            }
        });
    }
});

//server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });



// 'use strict';

// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express().use(bodyParser.json()); // creates http server
// const token = 'VERIFICATION_TOKEN'; // type here your verification token

// app.listen(3000, () => console.log('[ChatBot] Webhook is listening'));

// app.get('/', (req, res) => {
//     // check if verification token is correct
//     if (req.query.token !== token) {
//         return res.sendStatus(401);
//     }

//     // return challenge
//     return res.end(req.query.token);
// });

// app.post('/', (req, res) => {
//     // check if verification token is correct
//     if (req.query.token !== token) {
//         return res.sendStatus(401);
//     }

//     // print request body
//     console.log(req.body);

//     // return a text response
//     const data = {
//         responses: [
//             {
//                 type: 'text',
//                 elements: ['Hi check', 'Hello']
//             }
//         ]
//     };

//     res.json(data);
// });