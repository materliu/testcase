/**
 * User: mater(materliu@gmail.com)
 * Date: 6/16/14
 * Time: 5:55 PM
 */

var EventEmitter = require('events').EventEmitter;

var Counter = function (init) {

    this.increment = function () {
        init ++;
        this.emit('incremented', init);
    }
}

Counter.prototype = new EventEmitter();

var counter = new Counter(10);

var callback = function (count) {
    console.log(count);
}

counter.on('incremented', callback);

counter.increment();
counter.increment();
counter.increment();
counter.increment();


