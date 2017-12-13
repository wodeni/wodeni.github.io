
/***
* @param {string} latitude 
* @param {string} longitude
*/
function searchTweets(latitude, longitude) {
    console.log("Entering searchTweets");
    var search_results = [];
    var radius = 30;
    var queryString = "Twitter" + "&";
    queryString += "geocode=" +
                    latitude + "," +
                    longitude + "," +
                    radius + "mi";

    // Codebird call to actually make the query to Twitter API
    cb.__call(
        "search_tweets",
        "q=" + queryString,
        function (reply, rate_limit_status) {
            // console.log(reply);
            var data = {
                tweetTexts : []
            }
            search_results.push(reply.statuses);
            search_results.forEach(function(tweets) {
                data.tweetTexts = tweets
            });
            console.log(data);
        }
    );
}

// Tweet request by keyword from the user, returns a JSON of statuses
// @param:
//         username - the username
//         keyword  - the keyword searching for
app.post('/tweets', function (req, res) {
    var username  = req.body.username;
    var keyword   = req.body.keyword;
    var location  = req.body.location;
    console.log(username + " requested tweets containing " + keyword + " at " + location);

    // Form query string(s)
    var radius = 30;
    var queryString = keyword + "&"
    if(location) {
        queryString += "geocode=" +
                        location.latitude + "," +
                        location.longitude + "," +
                        radius + "km";
    }

    // Codebird call to actually make the query to Twitter API
    cb.__call(
        "search_tweets",
        "q=" + queryString,
        function (reply, rate_limit_status) {
            // console.log(reply)
            var data = {
                statuses : reply.statuses
            }
            res.json(data);
        },
        true
    );
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/main', function (req, res) {
    res.sendFile(path.join(__dirname+'/main.html'));
}); 

app.post('/main', function (req, res) {
    res.redirect('/main');
    console.log(req.body);
    var user = store.get('user');
    if (user == null) {
        // First time user
        console.log("Username is undefined");
        var arr;
        if (typeof req.body.locations == "string") {
            var rawValues = req.body.locations.split('_');
            var city = rawValues[0];
            searchTweets(rawValues[1], rawValues[2]);
            arr = [[city]];
        } else {
            var cities = new Array();
            for (i = 0; i < req.body.locations.length; i++) {
                var rawValues = req.body.locations[i].split('_');
                cities.push(rawValues[0]);
                searchTweets(rawValues[1], rawValues[2]);
            }
            arr = [cities];
        }
        store.set('user', { name:req.body.username, locations: arr});
    } else {
        // Repeated session user
        console.log(user.name + ' chose locations ' + user.locations);

        var arr = user.locations;
        if (typeof req.body.locations == "string") {
            var rawValues = req.body.locations.split('_');
            var city = rawValues[0];
            arr.push([city]);
        } else {
            var cities = new Array();
            for (i = 0; i < req.body.locations.length; i++) {
                var rawValues = req.body.locations[i].split('_');
                cities.push(rawValues[0]);
            }
            arr.push(cities);
        }
        store.set('user', { name:req.body.username, locations: arr});
    }
    
    store.each(function(value, key) {
        console.log(key, '==', value)
    });

}); 