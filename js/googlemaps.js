$(function () {

    function initialize() {

        // Center of United States
        var defaultLatlng = new google.maps.LatLng(37.09024, -95.712891);
        var biographies = [];
        var marker; // Used to have an i var here as well..... Still needed?

        // Default view for map
        var mapOptions = {
            zoom: 5,
            center: defaultLatlng
        };

        // Draws content to map canvas 
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
            position: new google.maps.LatLng(locations[i][2], locations[i][3]),     // Takes lat and lang as arguments
            map: map,                                                               // Draws to this current map  

         });

            // Creates a bio for each person and stores it in an array
            var biography = formatBiography(locations[i][0], locations[i][1], locations[i][4], locations[i][5], locations[i][6]);
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
        // RETURNS: A formatted string
        function formatBiography(name, city, bodyContent, twitter, websiteUrl) {
            var html = [""];

            html.push(
                '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>' +
                '<h3>' + city + '</h3>' +
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

    }

    // When dom load event is triggered, call initlaize function
        google.maps.event.addDomListener(window, 'load', initialize);
    
});





