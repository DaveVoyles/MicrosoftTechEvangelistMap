/// <reference path="../../typedefs/microsoft.maps.d.ts" />
System.register(["angular2/core", "angular2/http", "../authHelper/authHelper"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, authHelper_1;
    var Map;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (authHelper_1_1) {
                authHelper_1 = authHelper_1_1;
            }],
        execute: function() {
            Map = (function () {
                function Map(http, authHelper) {
                    var _this = this;
                    this.files = [];
                    this.infoWindowMaxWidth = 700;
                    this.infoWindowMaxHeight = 600;
                    // Perform REST call into Microsoft Graph for files on OneDrive for Business
                    http.get("https://graph.microsoft.com/v1.0/me/drive/root/children", {
                        headers: new http_1.Headers({ "Authorization": "Bearer " + authHelper.access_token })
                    })
                        .subscribe(function (res) {
                        // Check the response status before trying to display files
                        if (res.status === 200)
                            _this.files = res.json().value;
                        else
                            alert("An error occurred calling the Microsoft Graph: " + res.status);
                    });
                    // Bing map instance w/ DV's API key
                    var map = new Microsoft.Maps.Map(document.getElementById('BingMap'), {
                        credentials: 'Ah1_aJohnC76ttqxM-PjSm5rsabmFcLSOujmuYvfSmKSHAOk9Xm2X2E6AtCQBNPk'
                    });
                    // Focus map on center of United States
                    var defaultLngLag = [37.09024, -95.712891];
                    map.setView({ zoom: 5, center: new Microsoft.Maps.Location(defaultLngLag[0], defaultLngLag[1]) });
                    // Push pins for map
                    map.entities.clear();
                    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
                    map.entities.push(pushpin);
                    // InfoBox to appear after user clicks on pin
                    //var infoboxOptions = { width: 200, height: 100 };
                    //var infoboxOptions = { width: infoWindow, height: 100 };
                    //var defaultInfobox = new Microsoft.Maps.Infobox(map.getCenter(), infoboxOptions);
                    //map.entities.push(defaultInfobox);
                }
                /***
                 * Formats text for bio which appears above each pin when selected
                 * Loops through content in "Locations" array and places it in bio.
                 * @return {string}
                 */
                Map.prototype.formatBiography = function (name, city, spec, img, bio, twitter, websiteUrl) {
                    var html = [""];
                    html.push('<div class="bio-container">' +
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
                        '</div><!-- .bio-container -->');
                    return html.join('');
                };
                ;
                Map = __decorate([
                    core_1.Component({
                        selector: "files",
                        templateUrl: "src/map/map.html",
                        styleUrls: ["src/map/map.css"]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, authHelper_1.AuthHelper])
                ], Map);
                return Map;
            })();
            exports_1("Map", Map);
        }
    }
});
//# sourceMappingURL=map.js.map