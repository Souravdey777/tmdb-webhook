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

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
