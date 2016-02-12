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
        // this.defaultInfobox = new Microsoft.Maps.Infobox(this.aCenterLoc, this.infoboxOptions);
        this.defaultInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(38.09024, -95.712891), this.infoboxOptions); // Put info box slight above pin
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
        
        // Toggle infobox when user hovers over pin
        let evt = document.createEvent('Event');
        evt.initEvent('customevent', true, true);
        
                // 
        // Microsoft.Maps.Events.addHandler(this.pushpin, 'click', ()=> this.defaultInfobox.setOptions(
        //     {visible:false}
        //     ));
        
        // Microsoft.Maps.Events.addHandler(this.pushpin, 'click', this.toggleInfoBox());
        

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
   
  
   //
    eventTest () : any { 
    Microsoft.Maps.Events.addHandler(this.pushpin, 'mouseover', this.tellMeSomething());
   }
    
    tellMeSomething () : any {
        console.log('hello');
        
   }

    toggleInfoBox() : any {
        if (this.defaultInfobox.getVisible() == false) {
            this.defaultInfobox.setOptions({visible: true})
            console.log('turning displayo on');
        }
        else
        {
            this.defaultInfobox.setOptions({visible:false}) 
            console.log('turning display off');
        }
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

