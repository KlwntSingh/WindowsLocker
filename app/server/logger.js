var logger = require('./log.js');

var logger_debug_old = logger.debug;
logger.debug = function (msg) {
    var fileAndLine = traceCaller(1);
    return logger_debug_old.call(this, fileAndLine + " : " + msg);
}

var logger_info_old = logger.info;
logger.info = function (msg) {
    var fileAndLine = traceCaller(1);
    return logger_info_old.call(this, fileAndLine + " : " + msg);
}

var logger_error_old = logger.error;
logger.error = function (msg) {
    var fileAndLine = traceCaller(1);
    return logger_error_old.call(this, fileAndLine + " : " + msg);
}

function traceCaller(n) {
    if (isNaN(n) || n < 0) n = 1;
    n += 1;
    var s = (new Error()).stack,
        a = s.indexOf('\n', 5);
    while (n--) {
        a = s.indexOf('\n', a + 1);
        if (a < 0) {
            a = s.lastIndexOf('\n', s.length);
            break;
        }
    }
    b = s.indexOf('\n', a + 1);
    if (b < 0) b = s.length;
    a = Math.max(s.lastIndexOf(' ', b), s.lastIndexOf('/', b));
    b = s.lastIndexOf(':', b);
    s = s.substring(a + 1, b);
    return s;
}

module.exports = logger;