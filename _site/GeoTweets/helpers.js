// Twitter authentication via Codebird
var cb = new Codebird;
cb.setConsumerKey("NGgo6GXwtexoVanOxgKPo8nsf", "xTGyMtCR9CcUEpisa7IuyqBkzfhhoOZLQw3Y22Xep1hVgbVSLq");

function processLandingForm(username, cities, coordinates) {

  console.log(username);
  // console.log(cities);
  // console.log(coordinates);
  var data = [];
  storeSession(username, cities, data);
}

function storeSession(username, cities, data) {
  var user = store.get('user');
    if (user == null) {
        // First time user
        console.log("Username is undefined. Will store user " + username);
        var arr = [cities];
        console.log("arr is ");
        console.log(arr);
        store.set('user', { name:username, locations: arr});
    } else {
        // Repeated session user
        console.log(user.name + ' chose locations ' + user.locations);

        var arr = user.locations;
            
        arr.push(cities);
        
        store.set('user', { name:username, locations: arr});
    }
    
    store.each(function(value, key) {
        console.log(key, '==', value)
    });
}

$(document).ready(function() {
  console.log("Recognized");
  <!-- Select & Add Multiple Tags -->
  $(".select-add-tags").select2({
      tags: true,
      theme: "bootstrap",
  })
  $(".player").mb_YTPlayer();

  document.getElementById('landing-submit-btn').addEventListener('click', function (e) {
        e.preventDefault();
        console.log("Landing form submitted");

        var name = $('#username').val();
        var cities = [];
        var coordinates = [];
        $( "select option:selected" ).each(function() {
            var location = $( this ).val().split("_");
            cities.push(location[0]);
            coordinates.push({ name: location[0], latitude: location[1], longitude: location[2] });
        });

        processLandingForm(name, cities, coordinates);

        // Inject information into main.html


        // Uncomment the line below when ready to redirect
        // window.location.href = "main.html";


  });


  /*

  // Submission of search form by user
  document.getElementById('submit-btn').addEventListener('click', function (e) {
      e.preventDefault();
      console.log("Entered");

      // retrieve form data
      var name = $('#username').val();
      var locations  = [];
      $( "select option:selected" ).each(function() {
          var coord = $( this ).val().split("_");
          var place = $( this ).text();
          locations.push({ name: place, latitude: coord[0], longitude: coord[1] });
      });
      var data = {
          name: name,
          locations : locations
      };
      // Make request to serve for tweets
      $.post( "tweets",  data, function(data){
          // display tweets in #tweets in index.html
          // console.log(data);
          var msgs = []
          data.tweetTexts.forEach(function(s) {
              msgs += '<p>' + s.text + '</p><br>';
          });
          //$.get( "main",  data, function());
          $('#tweets').html(msgs);

      });
  }, false);  */
});
