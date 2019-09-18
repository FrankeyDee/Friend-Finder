var friends = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
  });
  
    app.post('/api/friends', function(req, res) {
        var newFriend = req.body;
        console.log("new friend: ", newFriend);
        //find match
        var lowScore = 500;
        var bestMatch = "";

        for (i = 0; i<friends.length; i++) {
            var newScore = newFriend.scores;
            var currentFriendScore = friends[i].scores;
            var difference = 0;

            for (j = 0; j<newScore.length; j++) {
              var scoreDifference = Math.abs(parseInt(currentFriendScore[j]) - parseInt(newScore[j]));
                difference = scoreDifference + difference;  
            }
            if (difference < lowScore){
                lowScore = difference;
                bestMatch = friends[i];
            }
        }
        //add to array
        friends.push(newFriend);
        res.json(bestMatch);
    });
};