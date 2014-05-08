/**
 * User: Liu Juguang(materliu@tencent.com)
 * Date: 5/8/14
 * Time: 7:41 PM
 */

;(function() {
    "use strict";

    function Rect(minx, miny, maxx, maxy) {
        this.minx = minx;
        this.miny = miny;
        this.maxx = maxx;
        this.maxy = maxy;
    }

    function max(a, b) {
        if (a >= b) {
            return a;
        } else {
            return b;
        }
    }

    function min(a, b) {
        if (a >= b) {
            return b;
        } else {
            return a;
        }
    }

    function isOverlay(RectA, RectB) {
        var minxA = RectA.minx,
            minyA = RectA.miny,
            maxxA = RectA.maxx,
            maxyA = RectA.maxy,
            minxB = RectB.minx,
            minyB = RectB.miny,
            maxxB = RectB.maxx,
            maxyB = RectB.maxy;

        var minx = max(minxA, minxB),
            miny = max(minyA, minyB);

        var maxx = min(maxxA, maxxB),
            maxy = min(maxyA, maxyB);

        if (minx > maxx || miny > maxy) {
            return false;
        } else {
            return true;
        }

    }

    var retA = new Rect(3, 3, 6, 6);
    var retB = new Rect(7, 7, 9, 9);

    console.log(isOverlay(retA, retB));

    function _cartasinProductByTwo(arrA, arrB) {
        var _tmpArr = [],
            arrALen,
            arrBlen;

        for (var i= 0, arrAlen = arrA.length; i<arrAlen; i++) {
            for (var j= 0, arrBlen = arrB.length; j<arrBlen; j++) {
                _tmpArr.push(arrA[i] + arrB[j]);
            }
        }

        return _tmpArr;
    }

    console.log(_cartasinProductByTwo(['a', 'b'], ['c', 'd']));

    function cartasinProduct() {

        var i = 0,
            tempResult = [''],
            len = arguments.length;


        for (; i<len; i++) {
            tempResult = _cartasinProductByTwo(tempResult, arguments[i]);
        }

        return tempResult;

    }

    console.log(cartasinProduct(['a', 'b'], ['e'], ['c', 'd']));

    function ArrayMeta(value, next) {
        this.value = value;
        this.next = next;
    }

    ArrayMeta.prototype.toString = function () {
        console.log(this.value);
    }

    function printMetaList(metaList) {
        var next = metaList;

        next.toString();
        while(next = next.next) {
            next.toString();
        }
    }

    var metaA = new ArrayMeta('a', null);
    var metaB = new ArrayMeta('b', metaA);
    var metaC = new ArrayMeta('c', metaB);
    var metaD = new ArrayMeta('d', metaC);
    var metaE = new ArrayMeta('e', metaD);

    function oddEvChange(metaList) {
        var count = 0,
            _tmpNext = metaList,
            _prev,
            _tmpOne = _tmpNext,
            _tmpTwo,
            _tmpThr;


        while (_tmpNext.next) {

            _tmpThr = _tmpNext.next.next;

            if (count % 2 === 0) {
                _tmpTwo = _tmpNext.next;
                _tmpTwo.next = _tmpNext;

                if (_prev) {
                    _prev.next = _tmpTwo;
                }

                if (!(_tmpThr)) {
                    _tmpNext.next = null;
                } else {
                    _tmpNext.next = _tmpThr;
                }
            } else {
                _prev = _tmpNext;
                _tmpNext = _tmpNext.next;
            }

            if (count++ === 0) {
                _tmpOne = _tmpTwo;
            }

        }

        return _tmpOne;
    }

//    console.log('----------------- a ---------- a -------------- start');
//    printMetaList(metaA);
//    printMetaList(oddEvChange(metaA));
//    console.log('----------------- a ---------- a -------------- end\n\n');
//
//    console.log('----------------- b a ---------- a b -------------- start');
//    printMetaList(metaB);
//    printMetaList(oddEvChange(metaB));
//    console.log('----------------- b a ---------- a b -------------- end\n\n');

//    console.log('----------------- c b a ---------- b c a -------------- start');
//    printMetaList(metaC);
//    printMetaList(oddEvChange(metaC));
//    console.log('----------------- c b a ---------- b c a -------------- end\n\n');

//    console.log('----------------- d c b a ---------- c d a b -------------- start');
//    printMetaList(metaD);
//    printMetaList(oddEvChange(metaD));
//    console.log('----------------- d c b a ---------- c d a b -------------- end\n\n');
//
    console.log('----------------- e d c b a ---------- d e b c a  -------------- start');
    printMetaList(metaE);
    printMetaList(oddEvChange(metaE));
    console.log('----------------- e d c b a ---------- d e b c a  -------------- end\n\n');






}());
