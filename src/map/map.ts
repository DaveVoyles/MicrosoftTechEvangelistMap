/// <reference path="../../typings/microsoft.maps.d.ts" />

import { Component, View } from "angular2/core";
import { Http, Headers   } from "angular2/http";
import { AuthHelper      } from "../authHelper/authHelper"

@Component({
    selector: "map",
    templateUrl: "src/map/map.html",
    styleUrls: ["src/map/map.css"]
})

export class Map {
        
    // Instantiate map & box
    private myMap;
    private defaultInfobox;
    private pushpin;
    
    
    // Locations
    private aDefaultLngLat = [37.09024, -95.712891];
    private aCenterLoc = new Microsoft.Maps.Location(this.aDefaultLngLat[0], this.aDefaultLngLat[1]);

    private infoboxOptions = { width: 400, height: 250, showCloseButton: true };
    private bingAPIKey = 'Ah1_aJohnC76ttqxM-PjSm5rsabmFcLSOujmuYvfSmKSHAOk9Xm2X2E6AtCQBNPk';       
    

    constructor(http: Http, authHelper: AuthHelper) {

        // Create Map, infobox, & pushpin
        this.defaultInfobox = new Microsoft.Maps.Infobox(this.aCenterLoc, this.infoboxOptions);
        this.myMap          = new Microsoft.Maps.Map(document.getElementById('BingMap'), {
            credentials: this.bingAPIKey
        });
        this.pushpin        = new Microsoft.Maps.Pushpin(this.aCenterLoc);         
        
        // Center map on the United States   
        this.myMap.setView({ zoom: 5, center: this.aCenterLoc })
     
        // Create pin and infobox
        this.myMap.entities.clear();
        this.myMap.entities.push(this.pushpin);
        this.myMap.entities.push(this.defaultInfobox);  

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

