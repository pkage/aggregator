Meteor.startup(function() {
  Session.set("subs", "worldnews+news+technology+politics+business+economics/rising");
});

updateScreen = function() {
  HTTP.get("http://api.reddit.com/r/" + Session.get("subs"), {}, function(err, response) {
    if (response == null || response.statusCode !== 200) {
      $('#ftgc').fadeIn();
      Meteor.setTimeout(function() {$('#ftgc').fadeOut();}, 2000);
      return;
    } else {
      $('#ftgc').hide();
    }
//    console.log(response);
    var data = EJSON.parse(response.content);
//    console.log(data);
    var posts = data.data.children;
    var post = posts[Math.floor(Math.random() * posts.length)];
    post = post.data;
    console.log(post);
    $('#postauthor').text('/u/' + post.author + ' in /r/' + post.subreddit + ":");
//    console.log(post.author);
    $('#posttitle').text(post.title);
    $('#postdomain').text(post.domain);
    $('#posturl').text(post.url);
    Session.set("posturl", post.url);
    document.body.style.background = getRandomColor();
  });
}

getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

Template.reddit.rendered = function() {
  updateScreen();
  Meteor.setInterval(updateScreen, 10000);
}

Template.reddit.posturl = function() {
  return Session.get('posturl');
}

Template.reddit.events({
  'click': function() {
    window.open(Session.get('posturl'));
  },
  'keydown': function() {
    window.open(Session.get('posturl'));
  }
})
