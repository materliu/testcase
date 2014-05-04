/**
 * User: Liu Juguang(materliu@tencent.com)
 * Date: 5/4/14
 * Time: 9:04 PM
 */

;(function() {

    /**
     * ==============================================
     Question:

     定义这样一个函数

     function repeat(func, times, wait) {
     }

     参数分别是需要repeat的函数， repeat的次数，每次repeat的间隔

     使用方式如下

     调用这个函数能返回一个新函数

     var repeatedFun = repeat(alert, 10, 5000);

     调用这个新函数，如: repeatFun("hellworld");

     会alert十次 helloworld
     * @param func
     * @param times
     * @param wait
     */
    function repeat(func, times, wait) {

        return function () {

            var count = 0,
                tempArgus = arguments;

//            setTimeout(_tempRepeat, wait);

            (function _tempRepeat() {

                func.apply(this, tempArgus);

                if (++count === times) {
                    return;
                }

                setTimeout(_tempRepeat, wait);
            }());
        }
    }


    var repeatedFun = repeat(alert, 10, 5000);

    repeatedFun("hello world!");

})();
