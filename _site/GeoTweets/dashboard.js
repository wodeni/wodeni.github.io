$(document).ready(function() {
  console.log("Dashboard");
  $('.locations').select2();
  var tabLinks = new Array();
  var contentDivs = new Array();


  function getSessions(locations){
    var len = locations.length;
    text = '<div class=\"panel-heading list-group-item\" role=\"tab\" id=\"headingOne\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\" aria-expanded=\"true\" aria-controls=\"collapseOne\" data-expandable=\"false\">';
    for (i = 0; i < len-1; i++) {
        text += locations[i].name.split(",")[0] + ', ';
    }
    text += locations[len-1].name.split(",")[0] + '</a></h4></div>';
    return text;
  }

  document.getElementById('update').addEventListener('click', function (e) {
      e.preventDefault();
      console.log("update button");

      var locations  = [];
      $( "select option:selected" ).each(function() {
          var coord = $( this ).val().split("_");
          var place = $( this ).text();
          locations.push({ name: place, latitude: coord[0], longitude: coord[1] });
      });

      if (locations[0]){
          var data = {
              locations : locations
          };
          // Make request to serve for tweets
          $.post( "tweets2",  data, function(data){
              // display tweets in #tweets in index.html
              // console.log(data);
              var msgs = [];
              data.tweetTexts.forEach(function(s) {
                  msgs += '<p>' + s.text + '</p><br>';
              });
              //$.get( "main",  data, function());
              $('#tweets').html(msgs);
      });

      } else {
        alert("choose locations first")
      }
  }, false);

  function tweetRequest(locations){
    var len = locations.length;
    var tabContents = [];
    var tabLocations = [];
    var counter = 0
    for (i = 0; i < len; i++) {
        tabLocations.push(locations[i].name.split(",")[0]);
    }

    for (i = 0; i < len; i++) {
        loc = locations[i]
        var data = {
              loc : loc
          };
        console.log("location for loop");
        $.post( "tweets2",  data, function(data){
              // display tweets in #tweets in index.html
              // console.log(data);
              var msgs = '';
              data.tweetTexts.forEach(function(s) {
                  msgs += '<p>' + s.text + '</p><br>';
              });
              //$.get( "main",  data, function());

              tabContents.push(msgs);

              counter++;
              if (counter == len) {
                  console.log(tabContents);
                  console.log(tabLocations);
                  addToTabs(tabLocations, tabContents);
              }

          });
      }

    return;
  }

  function addToTabs(tabLocations, tabContents) {
      var tabs = "";
      var content = "";
      var loc = tabLocations[0];
      var con = tabContents[0];
      tabs += '<li class="active"><a data-toggle="tab" href="#' + loc + '">' + loc + '</a></li>';
      content += '<div id="' + loc + '" class="tab-pane fade in active"> ' + con +'</div>';

      var len = tabLocations.length;
      for (i = 1; i < len; i++) {
        loc = tabLocations[i];
        con = tabContents[i];
        tabs += '<li><a data-toggle="tab" href="#' + loc + '">' + loc + '</a></li>';
        content += '<div id="' + loc + '" class="tab-pane fade"> ' + con +' </div>';

      }
      console.log(tabs);
      console.log(content);
      document.getElementById("tabsloc").innerHTML = tabs;
      document.getElementById("tabscontent").innerHTML = content;



  }

  // Submission of search form by user
  document.getElementById('new-session').addEventListener('click', function (e) {
      e.preventDefault();
      console.log("new session");

      // retrieve form data
      var locations  = [];
      $( "select option:selected" ).each(function() {
          var coord = $( this ).val().split("_");
          var place = $( this ).text();
          locations.push({ name: place, latitude: coord[0], longitude: coord[1] });
      });

      tweetRequest(locations);


      /*
      var data = {
          locations : locations
      };
      document.getElementById("sessions").innerHTML += getSessions(locations);
      // Make request to serve for tweets
      $.post( "tweets2",  data, function(data){
          // display tweets in #tweets in index.html
          // console.log(data);
          var msgs = []
          data.tweetTexts.forEach(function(s) {
              msgs += '<p>' + s.text + '</p><br>';
          });
          //$.get( "main",  data, function());
          $('#tweets').html(msgs);

      });*/
  }, false);
});
