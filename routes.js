var router = require('express').Router();
var Twitter = require('twitter');
var config = require('./config');

var client = new Twitter({
	consumer_key: config.twitter.consumer_key,
	consumer_secret: config.twitter.consumer_secret,
	access_token_key: config.twitter.access_token_key,
	access_token_secret: config.twitter.access_token_secret
});


router.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

router.get('/tweets', function(req, res, next) {
	// /tweets returns only my tweets, /tweets?handle=somehandle returns somehandle's tweets
	var handle = req.query.handle;
	console.log('QUERY is:', req.query);
	// go to twitter, get the tweets of the specified handle (should be placed in the query string)
	client.get('statuses/user_timeline', {
		screen_name: handle,
		count: 20
	}, function(err, tweets) {
		if (err) {
			return next(err);
		}
		var leanTweets = tweets.map(function(tweet) {
			// extract relevant info, map it to an object to be attached to scope
			return {
				name: tweet.user.name,
				handle: tweet.user.screen_name,
				text: tweet.text,
				date: tweet.created_at,
				imageUrl: tweet.user.profile_image_url
			};
		});
		res.json(leanTweets);
	});
});


module.exports = router;