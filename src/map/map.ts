/// <reference path="../../typings/microsoft.maps.d.ts" />

import { Component, View } from "angular2/core";
import { Http, Headers   } from "angular2/http";
import { AuthHelper      } from "../authHelper/authHelper"

@Component({
	selector   : "map",
	templateUrl: "src/map/map.html",
    styleUrls  :["src/map/map.css"]
})

export class Map {
    private files               = [];
    public bingAPIKey           ='Ah1_aJohnC76ttqxM-PjSm5rsabmFcLSOujmuYvfSmKSHAOk9Xm2X2E6AtCQBNPk';

    constructor(http: Http, authHelper: AuthHelper) {
		
        // Perform REST call into Microsoft Graph for files on OneDrive for Business
		// http.get("https://graph.microsoft.com/v1.0/me/drive/root/children", {
		// 	headers: new Headers({ "Authorization": "Bearer " + authHelper.access_token })
		// })
		// .subscribe(res => {
		// 	// Check the response status before trying to display files
		// 	if (res.status === 200)
		// 		this.files = res.json().value;
		// 	else
		// 		alert("An error occurred calling the Microsoft Graph: " + res.status);
        //     });

        // Bing map instance w/ DV's API key
        let map = new Microsoft.Maps.Map(document.getElementById('BingMap'), {
            credentials: 'Ah1_aJohnC76ttqxM-PjSm5rsabmFcLSOujmuYvfSmKSHAOk9Xm2X2E6AtCQBNPk'
        });
               
        
        // Focus map on center of United States
        let aDefaultLngLat = [37.09024, -95.712891];
        
        let aCenterLoc = new Microsoft.Maps.Location(aDefaultLngLat[0], aDefaultLngLat[1]);
        map.setView({ zoom: 5, center: aCenterLoc })

        // Push pins 
        map.entities.clear();
        var pushpin = new Microsoft.Maps.Pushpin(aCenterLoc);
        map.entities.push(pushpin);
        
        // InfoBox to appear after user clicks on pin
        let infoboxOptions = { width: 500, height: 300 };
        let defaultInfobox = new Microsoft.Maps.Infobox(aCenterLoc, infoboxOptions);
        map.entities.push(defaultInfobox);
    }  


    /***
     * Formats text for bio which appears above each pin when selected
     * Loops through content in "Locations" array and places it in bio. 
     * @return {string} 
     */
    formatBiography(name, city, spec, img, bio, twitter, websiteUrl): string {
        var html = [""];

        html.push(
            '<div class="bio-container">' +
            '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>' +
            '<h3>' + city + '</h3>' +
            '<h3>' + spec + '</h3>' +
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

