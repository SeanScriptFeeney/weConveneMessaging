
# weConveneMessaging
weConvene Messaging App

## Build & development

Download json-server to run the server for data (npm install json-server -g).

Navigate to the json-server directory and run `json-server --watch db.json`.

Run `grunt` for building and `grunt serve` for launching the App.

## Testing

Running `grunt unit-test` will run the unit tests with karma.

Running `protractor ./test/protractor.conf.js` will run the Protractor/Selenium tests with karma.

To run the e2e tests successfully make sure to use `grunt serve` to serve the application first as the seleniumAddress is pointed at the same address as the node server.

