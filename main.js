/*
(c) Copyright 2020 Akamai Technologies, Inc. Licensed under Apache 2 license.

Version: 1.1
Purpose:  Modify an HTML streamed response by replacing a text string two times across the entire response.

*/

import { ReadableStream, WritableStream } from 'streams';
import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';
import { TextEncoderStream, TextDecoderStream } from 'text-encode-transform';
import { FindAndReplaceStream } from 'find-replace-stream.js';
import { logger } from 'log';


export function responseProvider (request) {
  // Get text to be searched for and new replacement text from Property Manager variables in the request object.
  // const tosearchfor = request.getVariable('PMUSER_EWSEARCH');
  // const newtext = request.getVariable('PMUSER_EWNEWTEXT');
  // Set to 0 to replace all, otherwise a number larger than 0 to limit replacements
  var country = request.userLocation.country;
  const tosearchfor =  'images/fd4771c7bd7ae663a8cd04299dc930eb458a7e2c1d99b5627243ad8fa4ff25db048c785c18ad4ce9a791ba1af54d8d56d34f1648752e0f3344ead9_1280.jpg';
  var newtext =  'images/' + country + '.jpg';
  //const newtext =  'images/IN.jpg';
  const howManyReplacements = 1;

  return httpRequest(`${request.scheme}://${request.host}${request.url}`).then(response => {
    return createResponse(
      response.status,
      response.headers,
      response.body.pipeThrough(new TextDecoderStream()).pipeThrough(new FindAndReplaceStream(tosearchfor, newtext, howManyReplacements)).pipeThrough(new TextEncoderStream())
    );
  });
}
