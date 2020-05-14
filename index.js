// dependencies
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const http = require('https');
var unirest = require("unirest");
let errorResposne = {
    results: []
};
var port = process.env.PORT || 8080;
// create serve and configure it.
const server = express();
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb('6ed9d94bd9ea7880be31f354d69cc925')

server.use(bodyParser.json());
server.post('/getMovies', function (request, response) {

    //if(request.queryResult.parameters['top-rated']) {
    // Using just the Promise
    moviedb.movieTopRated({}).then(res => {
        //console.log(res)
        if (res.results.length > 0) {
            let result = res.results;
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
        }
    }).catch(console.error)


    // console.log(request.body.queryResult.parameters)
    // if(request.queryResult.parameters['top-rated']) {
    // var req = unirest("GET", "https://api.themoviedb.org/3/movie/top_rated");
    //     req.query({
    //         "page": "1",
    //         "language": "en-US",
    //         "api_key": API_KEY
    //     });
    //     req.send("{}");
    //     req.end(function(res) {
    //         if(res.error) {
    //             response.setHeader('Content-Type', 'application/json');
    //             response.send(JSON.stringify({
    //                 "speech" : "Error. Can you try it again ? ",
    //                 "displayText" : "Error. Can you try it again ? "
    //             }));
    //         } else if(res.body.results.length > 0) {
    //             let result = res.body.results;
    //             let output = '';
    //             for(let i = 0; i<result.length;i++) {
    //                 output += result[i].title;
    //                 output+="\n"
    //             }
    //             response.setHeader('Content-Type', 'application/json');
    //             response.send(JSON.stringify({
    //                 "speech" : output,
    //                 "displayText" : output
    //             })); 
    //         }
    //     });
    // } else if(request.queryResult.parameters['movie-name']) {
    //   console.log('popular-movies param found');
    //     let movie = request.body.result.parameters['movie-name'];
    //     var req = unirest("GET", "https://api.themoviedb.org/3/search/movie");
    //         req.query({
    //             "include_adult": "false",
    //             "page": "1",
    //             "query":movie,
    //             "language": "en-US",
    //             "api_key": API_KEY
    //         });
    //         req.send("{}");
    //         req.end(function(res) {
    //             if(res.error) {
    //                 response.setHeader('Content-Type', 'application/json');
    //                 response.send(JSON.stringify({
    //                     "speech" : "Error. Can you try it again ? ",
    //                     "displayText" : "Error. Can you try it again ? "
    //                 }));
    //             } else if(res.body.results.length > 0) {
    //             let result = res.body.results[0];
    //             let output = "Average Rating : " + result.vote_average + 
    //             "\n Plot : " + result.overview + "url" + result.poster_path
    //                 response.setHeader('Content-Type', 'application/json');
    //                 response.send(JSON.stringify({
    //                     "speech" : output,
    //                     "displayText" : output
    //                 }));
    //             } else {
    //                 response.setHeader('Content-Type', 'application/json');
    //                 response.send(JSON.stringify({
    //                     "speech" : "Couldn't find any deatails. :(  ",
    //                     "displayText" : "Couldn't find any deatails. :(  "
    //                 }));
    //             }
    //         });

    // } else if(request.queryResult.parameters['popular-movies']) {    
    //     var req = unirest("GET", "https://api.themoviedb.org/3/movie/popular");
    //         req.query({
    //             "page": "1",
    //             "language": "en-US",
    //             "api_key": API_KEY
    //         });
    //         req.send("{}");
    //         req.end(function(res){
    //             if(res.error) {
    //                 response.setHeader('Content-Type', 'application/json');
    //                 response.send(JSON.stringify({
    //                     "speech" : "Error. Can you try it again ? ",
    //                     "displayText" : "Error. Can you try it again ? "
    //                 }));
    //             } else {
    //                 let result = res.body.results;
    //                 let output = '';
    //                 for(let i = 0; i < result.length;i++) {
    //                     output += result[i].title;
    //                     output+="\n"
    //                 }
    //                 response.setHeader('Content-Type', 'application/json');
    //                 response.send(JSON.stringify({
    //                     "speech" : output,
    //                     "displayText" : output
    //                 })); 
    //             }
    //         });
    //}
});
server.get('/getName', function (req, res) {
    res.send('Sourav Dey');
});

server.listen(port, function () {
    console.log("Server is up and running...");
});