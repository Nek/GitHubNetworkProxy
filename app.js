var request = require('request'), 
    Connect = require('connect'), 
    CORS = require('connect-xcors'),
    url = require('url'),
    options = {},
    server
  ;

process.setMaxListeners(0);

server = Connect.createServer(
    // uses reasonable defaults when no options are given
    CORS(options),
    function(req, res) {
        console.log(req.method);
        var query = url.parse(req.url, true).query;
        var name = query.name || "Animatron";
        var repo = query.repo || "player";
        var rr = request('https://github.com/' + name  + '/' + repo  + '/network_data_chunk?start=0&end=500', 
                         function(err, resp, b) {});
        req.pipe(rr).pipe(res);
    }
);

server.listen(80);