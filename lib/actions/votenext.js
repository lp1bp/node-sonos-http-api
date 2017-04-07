'use strict';
var votes = 0;
var lastVote = Date.now()

function votenext(player) {
    var now = Date.now()
    var sinceLastVote = (now - lastVote) / 1000
    if (votes < 3 && sinceLastVote < 60){
	lastVote = now
	votes++
	return Promise.resolve({"status":"success", "votes": votes, "seconds_since_last_vote" : sinceLastVote});
    }
    else {
	if (votes === 3){
	    votes = 0;
	}
	if (sinceLastVote < 60){
	    return player.coordinator.nextTrack();
	}
	else {
	    votes = 1;
	    lastVote = Date.now()
	    return Promise.resolve({"status":"success", "votes": votes, "seconds_since_last_vote" : sinceLastVote});
	}
    }
}

module.exports = function (api) {
  api.registerAction('votenext', votenext);
}
