$(function () {

    function initialize() {

        // Center of United States
        var defaultLatlng = new google.maps.LatLng(37.09024, -95.712891);
        var biographies = [];
        var marker;
        var infoWindowMaxWidth  = 700;
        var infoWindowMaxHeight = 600;
        var zoom = 5;

        // Default view for map
        var mapOptions = {
            zoom:   zoom,
            center: defaultLatlng
        };

        // Draws content to map canvas 
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // Content for info window -- appears when user clicks on a marker
        var infowindow = new google.maps.InfoWindow({
            content:   "",
            maxWidth:  infoWindowMaxWidth,
            maxHeight: infoWindowMaxHeight
        });

        // Loop through evangelists
        for (var i = 0; i < evangelists.length; i++) {
            var e = evangelists;
            console.log(e[i]);

            marker = new google.maps.Marker({                         // Create a new marker for each location in array        
                position: new google.maps.LatLng(e[i].lng, e[i].lat), // Takes lat and lang as arguments
                map: map                                              // Draws to this current map  
            });

            // Creates a bio for each person and stores it in an array
            var biography = formatBiography(e[i].name, e[i].city, e[i].img, e[i].bio, e[i].twitter, e[i].websiteUrl);
            biographies.push(biography);
           
            // When you click the marker, pop up an info window
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(biographies[i]);
                    infowindow.open(map, marker);                    // open window using current map and currently slect marker
                }
            })(marker, i));

        };

        // Formats text for bio -- apears above each pin when selected
        // Loops through content in "Locations" array and places it in bio
        // RETURNS: A formatted string
        function formatBiography(name, city, img, bio, twitter, websiteUrl) {
            var html = [""];

            html.push(
                '<div class="bio-container">' +
                '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>' +
                '<h3>' + city + '</h3>' +
                '<div id="bodyContent">' +
                 bio +
                '</div> <!-- .bodyContent-->' +
                '<p>' +
                '<a href=' + twitter + '/>' + twitter +
                '<p>' +
                '<a href="' + websiteUrl + '"/>' + websiteUrl +
                '</div> <!-- Bio Container -->' +
                '<img src=' + img + ' class = "evangelist-img">' +
                '</div><!-- .bio-container -->'
                );
            return html.join('');
        };

    }

    // When dom load event is triggered, call initlaize function
        google.maps.event.addDomListener(window, 'load', initialize);
    
});





