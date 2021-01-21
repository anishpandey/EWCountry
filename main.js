/*
(c) Copyright 2020 Akamai Technologies, Inc. Licensed under Apache 2 license.

Version: 0.2
Purpose:  Modify an HTML streamed response by adding a script before the closing head tag.
Repo: https://github.com/akamai/edgeworkers-examples/tree/master/hello-world
*/

// Import logging module
import { logger } from 'log'

export function onClientRequest(request) {
    // Outputs a message to the X-Akamai-EdgeWorker-onClientRequest-Log header.
    logger.log("Responding with hello world from the path: %s", request.path)


    var country = request.userLocation.country;
    if (country === 'FR') {
       request.respondWith(
        200, {},
        '<html><body><h1>Redirect to France 0.1</h1></body></html>')
    }
    else if (country === 'IN') {
       request.respondWith(
        200, {},
        '<html><body><h1>Should redirect to India 0.1 </h1></body></html>')
    }
    else if (country === 'US') {
       request.respondWith(
        200, {},
        '<html><body><h1>Should redirect to USA 0.1 </h1></body></html>')
    }
}

export function onClientResponse(request, response) {
    // Outputs a message to the X-Akamai-EdgeWorker-onClientResponse-Log header.
    logger.log("Adding a header in ClientResponse")

    response.setHeader('EdgeWorkers', 'From Akamai EdgeWorkers 0.1')
}