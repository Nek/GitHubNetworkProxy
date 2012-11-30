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
        var start = query.start || "";
        var end = query.end || "";
        if (start !== "") start = 'start=' + start;
        if (end !== "") end = '&end=' + end;
        var l = 'https://github.com/' + name  + '/' + repo  + '/network_data_chunk?' + start + end;
        var rr = request(l, 
                         function(err, resp, b) {});
        req.pipe(rr).pipe(res);
    }
);

server.listen(80);