var http = require('http');
var bodyparser = require('./bodyParser');
/**
 *
 * @param options: visit true server's options object
 * @param data：request body data
 * @param callback: callback of getting the response from true server
 */
module.exports = function (options, data, callback) {
    //send request to real data server.
    //res: the response of server
    var request = http.request(options, function (res) {
        bodyparser(res, function (result) {
            callback(result);
        })
    })

    //sent request body to server
    request.end(data);
}