$(() => {
  const $page = $('#all-contents');

  //created tweets container
  const $tweetsDiv = $('<div class="tweets"></div>');
  //create button w/ id new tweets button
  const $buttonOne = $('<button id="new-tweets-button">Show New Tweets</button>');
  //create a back button w/ id back home button
  const $backButton = $('<button id="back-home-button">Back Home</button>');
  //create submit button w/ id submit tweet
  const $submit = $('<input type="submit" id="submit-tweet">Tweet here</button>');
  //
  const $usernameInput = $('<input id="username-input" type="text" placeholder="Type username..." />')
  const $messageInput = $('<input id="message-input" type="text" placeholder="Write a tweet..." />')
  //append to page
  $page.append($tweetsDiv, $buttonOne, $backButton, $submit, $usernameInput, $messageInput);

  //window.visitor = 'guest'
  //edit map to get correct format for tweets
 function getTweets(array){
  $tweetsDiv.empty()//clear old tweets
    const $tweets = array.slice().reverse().map((tweet) => {//function shows all tweets in reverse order newest first
    const $tweet = $('<div class="tweet"></div>'); //create a container for one tweet
    const $user = $(`<span class='username'>@${tweet.user}</span>`)
    //username element needs to be in its own tag to be clickable
    const $message = $(`<span class='message'>${tweet.message}</span>`)
    //message element needs to be in its own tag
    const timeStamp = moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a')//create timestamp w/ correct format using moment 
    const $timestamp = $(`<span class='timestamp'> (${timeStamp})</span>`)

    const timeMessage = moment(tweet.created_at).fromNow()
    const $timeMessage = $(`<span class='humanFriendlyTimestamp'> - ${timeMessage}</span>`)

   //append to tweets div
    $tweet.append($user, $message, $timestamp, $timeMessage)

    return $tweet;

    });

    $tweetsDiv.append($tweets); //add all tweets to tweetsDiv container

  }



 function newTweets(){ //make a function new tweets that shows all tweets on home page
  getTweets(streams.home)
  $backButton.hide() //hide back button on home timeline

  }

 function timeline(username){ //show tweets from a specific user
  const tweets = streams.users[username]
  getTweets(tweets)
  $backButton.show() //show the back button to return home

  }
  //when showing new tweets remove tweets that are on the page then add the tweets with stream.home again
  //look up jquery methods that remove or clear (tweetsdiv) an element (tag)
 $buttonOne.on('click', function(){ //button to show all tweets
  newTweets()

  })

 $tweetsDiv.on('click', '.username', function(){ //click a specific username to show their tweets
  const username = $(this).text().slice(1)//can remove @ sign
  timeline(username)

  })

 $backButton.on('click', function(){
  newTweets()

  })

 $submit.on('click', function(){ //event listener to submit new tweet
  const message = $messageInput.val().trim()
  const username = $usernameInput.val().trim()

  if(username && message){
    window.visitor = username;
    writeTweet(message)

    $usernameInput.val('')
    $messageInput.val('')
    newTweets()
  }

  })

 newTweets(streams.home)

});
