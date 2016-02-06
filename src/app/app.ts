import { Component, provide } from "angular2/core";
import { bootstrap } from "angular2/platform/browser";
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from "angular2/router";
import { HTTP_PROVIDERS } from "angular2/http";

import { Login } from "../login/login";
import { Map } from "../map/map";
import { AuthHelper } from "../authHelper/authHelper";

@Component({
    selector: "map",
    templateUrl: "src/app/app.html",
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})

// Configure the routes for the app
@RouteConfig([
    { name: "Login", component: Login, path: "/login" },
    { name: "Map", component: Map, path: "/map" }
])

export class App {
    constructor(router: Router, auth: AuthHelper) {
        router.navigate(["/Map"]);
        // if we later want to navigate to the login page we use...
        // router.navigate(["/Login"]);
    }
}

bootstrap(App, [AuthHelper, ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);