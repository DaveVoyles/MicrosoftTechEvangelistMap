$(function () {

    function initialize() {

        var defaultLatlng = new google.maps.LatLng(-55.363882, 131.044922);

        var locations = [
            ["Dave Voyles",  -55.363882, 131.044922,  "Some stuff about me", "@DaveVoyles",   "www.CecilFielder.wordpress.com"],
            ["Cecil Fielder", -55.363882, 141.044922, "Some stuff about me", "@CecilFielder", "www.CecilFielder.wordpress.com"]
        ];
        var biographies = [];
        var marker; // Used to have an i var here as well..... Still needed?

        // Default view for map
        var mapOptions = {
            zoom: 4,
            center: defaultLatlng
        };

        /* Draws content to map canvas */
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


        // Content for info window -- appears when user clicks on a marker
        var infowindow = new google.maps.InfoWindow({
            content: "stuff",
            maxWidth:  500,
            maxHeight: 500
        });



        // Loop through each location
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({                                       // Create a new marker for each location in array        
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),     // Takes lat and lang as arguments
            map: map,                                                               // Draws to this current map  

         });

            // Creates a bio for each person and stores it in an array
            var biography = formatBiography(locations[i][0], locations[i][3], locations[i][4], locations[i][5]);
            biographies.push(biography);

             
            // When you click the marker, pop up an info window
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(biographies[i]);
                    infowindow.open(map, marker);                                       // open window using current map and currently slect marker
                }
            })(marker, i));

        };

        // Formats text for bio -- apears above each pin when selected
        // Loops through content in "Locations" array and places it in bio
        // Returns: A formatted string
        function formatBiography(name, bodyContent, twitter, websiteUrl) {
            var html = [""];

            html.push(
                '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>' +
                '<div id="bodyContent">' +
                    bodyContent +
                '</div>' +
                '<p>' +
                '<a href=' + twitter + '/>' + twitter +
                '<p>' +
                '<a href="' + websiteUrl + '"/>' + websiteUrl
                );

            return html.join('');
        };

        //function drop() {
        //    for (var i = 0; i < markerPoints.length; i++) {
        //        setTimeout(function () {
        //            addMarker();
        //        }, i * 200);
        //    }
        //}

        //function addMarker() {
        //    markers.push(new google.maps.Marker({
        //        position: neighborhoods[iterator],
        //        map: map,
        //        draggable: false,
        //        animation: google.maps.Animation.DROP
        //    }));
        //    iterator++;
        //}


        // When a marker is clicked, open the info window for that marker
        //google.maps.event.addListener(marker, 'click', function () {
        //    infowindow.open(map, marker);
        //});
    }

    // When dom load event is triggered, call initlaize function
        google.maps.event.addDomListener(window, 'load', initialize);
    
});





