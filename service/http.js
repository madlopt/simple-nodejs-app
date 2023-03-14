const http = require("http").createServer();

function getServer(port = 80) {
    if (true === http.listening) {
        return http;
    }

    return http.listen(port);
}

module.exports = {getServer};