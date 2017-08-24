//Author: Guiyu (Zoey) Zhao
//Created 8/23/2017

//require file
var exported = require("./keys.js");

//Node.js File System Command
var fs = require('fs');

//=========================== Twitter API ===========================

//require file Twitter NPM package from https://www.npmjs.com/package/twitter

var Twitter = require('twitter');

// Taking in command
var command = process.argv[2];

// Crab Twitter Key info from keys.js
var client = new Twitter({
 consumer_key: exported.twitterKeys.consumer_key,
 consumer_secret: exported.twitterKeys.consumer_secret,
 access_token_key: exported.twitterKeys.access_token_key,
 access_token_secret: exported.twitterKeys.access_token_secret
});

if (command === "my-tweets"){
    
    // Twitter NPM Example
    var params = {screen_name: 'CodingExpert01'};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        //   console.log(JSON.stringify(tweets, null, 2)); // All tweets info
        for (var index = 0; index < 20; index++) {
            var myTweets = tweets[index].text;
            var tweetDate = tweets[index].created_at;
            var myTweetsOutput = "My Tweet #" + (index+1) + " created on: " + tweetDate + " is\n" + "'" + myTweets + "'";

                console.log(myTweetsOutput + "\n");
            
            // Bonus: Append File // NEED TO LOOK INTO WHEY THE CONTENT IN log.txt IS NOT IN THE RIGHT ORDER!!!!!!! 
            fs.appendFile('log.txt', myTweetsOutput, (err) => {
                if (err) throw err;
            });
            
            };  
        }

        // Outside of For Loop
        console.log('myTweetsOutput was appended to file!');
    });
}

//=========================== Spotify API ===========================
// NPM Package: https://www.npmjs.com/package/node-spotify-api
// Spotify Application: https://developer.spotify.com/my-applications/#!/

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
 id: exported.SpotifyKeys.client_id,
 secret: exported.SpotifyKeys.client_secret
});

// Grab Song Name
var songNameInput = process.argv[3]; // NEED TO CHANGE THIS TO ARRAY TO GRAB THE FULL SONG SEARCH INPUT!!!!!!!!!

if (command === "spotify-this-song"){

    spotify.search({ type: 'track', query: songNameInput , limit: 10 }, function(err, data) {
    if (err) {
    return console.log('Error occurred: ' + err);
    }

    // console.log(JSON.stringify(data, null, 2)); // All response

    for (var index = 0; index < 10; index++) {
        var artists = data.tracks.items[index].album.artists[0].name;
        var songName = data.tracks.items[index].name;
        var songPreviewLink = data.tracks.items[index].preview_url;
        var album = data.tracks.items[index].album.name;
        // console.log("Artist(s): " + artists);
        // console.log("Song Name: " + songName);
        // console.log("Song Preview Link: " + songPreviewLink);
        // console.log("Album: " + album + "\n");
        var SpotifyOutput = "Artist(s): " + artists +
        "\nSong Name: " + songName +
        "\nSong Preview Link: " + songPreviewLink +
        "\nAlbum: " + album + "\n";

        console.log("Artist(s): " + artists +
        "\nSong Name: " + songName +
        "\nSong Preview Link: " + songPreviewLink +
        "\nAlbum: " + album + "\n");

        // Bonus: Append File // NEED TO LOOK INTO WHEY THE CONTENT IN log.txt IS NOT IN THE RIGHT ORDER!!!!!!! 
        fs.appendFile('log.txt', SpotifyOutput, (err) => {
            if (err) throw err;
        });
    }

    });
};