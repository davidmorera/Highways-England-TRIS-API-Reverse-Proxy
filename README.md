
## Overview of the Server

This is the API server to proxy client requests to Highways England TRIS API that allows CORS

Based on https://github.com/cloudmu/darksky

## Server Side Scripts
Under this server directory, you can run (in a separate command line window):

### `npm install`
This will install the dependencies for the server side.

### `npm run server`
This will run the server on port 8080, which will be listening to the client requests for Anual traffic reports for counter sites, and proxying to Highways England TRIS API.
