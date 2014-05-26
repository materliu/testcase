/**
 * User: mater(materliu@gmail.com)
 * Date: 5/14/14
 * Time: 7:40 PM
 */

(function() {
    'use strict';

    var UTILS = {

        /**
         * 获取 e 元素的第n个父节点
         * @param e
         * @param n
         */
        parent: function (e, n) {

            if (n === undefined) {
                return n;
            }

            while(n-- && e) {
                e = e.parentNode;
            }

            if (!e || e.nodeType !== 1) {
                return null;
            }

            return e;
        },

        /**
         * 获取一个element上label属性的值, 如果这个element没有label属性,
         * 则判断这个element的父元素是否是一个label元素， 若是， 则取这个label的innerText
         * @param element
         */
        getLabel: function (element) {

            // labels属性，属于新规范 Returns a NodeList of all the label elements that the form control is associated with.
            if ('labels' in element && element.labels.length > 0) {
                return element.labels[0].textContent;
            }

            /*
             * <label id="js-command-bar-field-label">test<input type="text" data-hotkey="s, /" name="q" id="js-command-bar-field" placeholder="Search or type a command" tabindex="1" autocapitalize="off" data-username="materliu" autocomplete="off" spellcheck="false"></label>
             * 如上这种情况, $('js-command-bar-field-label').textContent 和 innerText 返回的都是 test
             */
            if (element && element.parentNode && element.parentNode.tagName.toLowerCase() === 'label') {
                return element.parentNode.textContent;
            }

            return '';
        }
    };

    function init() {
        var formOrder = document.forms.order,
            saveButton = document.getElementById('save-button'),
            qtyFields = formOrder.quantity,
            qtyLength = qtyFields.length,    // 这里有一个点需要注意， 那就是如果命中的input元素只有一个的话，length的值将为undefined
            saveButtonClicked;


        function saveForm() {

            if (!'formaction' in document.createElement('input')) {
                var formAction = saveButton.getAttribute('formaction');
                formOrder.setAttribute('action', formAction);
            }
            saveButtonClicked = true;
        }

        saveButton.addEventListener('click', saveForm, false);

        /**
         * 计算当前货品对应的总价格
         */
        function cacluteTotal(e) {

            var inputTarget;    // 被用户点击的input[type=number]元素

            /*
             * 如果是通过事件触发的， 只修改当前行对应的商品的价值
             * 如果是自执行， 修改所有商品对应的价值
             */

            /**
             * 计算单行商品的价值
             * @param trElement 单行商品呈现所在的tr html 元素
             * @private
             */
            function _cacluteSingleGoodTotalPrice(trElement) {
                var goodQuantityElement = trElement.querySelector('[name="quantity"]'),
                    goodSinglePrice = goodQuantityElement.dataset.price,
                    goodTotalPriceElement = trElement.querySelector('.price-total'),
                    goodQuantity,
                    goodTotalPrice;

                if (!(goodQuantity = goodQuantityElement.valueAsNumber)) {
                    goodQuantity = parseFloat(goodQuantityElement.value);
                }

                goodTotalPrice = goodSinglePrice * goodQuantity;

                goodTotalPrice = formatMoney(goodTotalPrice);

                goodTotalPriceElement.value = goodTotalPrice;
            }

            if (e) {

                // 传入的e对象的target为input[type=number]元素
                inputTarget = e.target;     // 在IE8及之前需要使用srcElement

                // 获取inputTarget对应的trElement
                _cacluteSingleGoodTotalPrice(UTILS.parent(inputTarget, 2));

            } else {

                // 计算所有商品的价格
                for (var i=0; i<qtyLength; i++) {
                    _cacluteSingleGoodTotalPrice(UTILS.parent(qtyFields[i], 2));
                }
            }
        }

        cacluteTotal();

        /**
         * 只执行一次的函数， 用来在quantity上绑定对应的监听函数来响应用户对货品数量选择的变更
         * 对应修改货品的总价值
         */
        (function listenOrderChange() {

            for (var i= 0; i<qtyLength; i++) {
                qtyFields[i].addEventListener('input', cacluteTotal, false);
                qtyFields[i].addEventListener('keyup', cacluteTotal, false);
            }

        })();


        /*
         * 为元素添加定制化的错误信息
         * 这里要注意，并不是添加了定制化的错误信息，就会立即给予用户提示，提示一定是发生在用户提交form的时候
         */
        var doCustomValidate = function (el, msg) {

            if ('setCustomValidity' in el) {
                el.setCustomValidity(msg);
            } else {
                el.validationMessage = msg;
            }
        }

        /*
         * 为form中需要做校验的元素添加定制化的错误信息
         */
        var validateForm = function () {
//            doCustomValidate(formOrder.name, '');
//            doCustomValidate(formOrder.password, '');

            if (formOrder.name.value.length < 4) {
                doCustomValidate(formOrder.name, 'name must be at least 4 characters long');
            }
        }

        /**
         * 当form提交验证校验不通过的时候，调用此事件处理函数
         * @param event
         */
        var handleValidateFail = function (event) {

            // event.target 对象会是 input 元素
            formOrder.className = 'invalid';
        }

        formOrder.addEventListener('input', validateForm);
        formOrder.addEventListener('keyup', validateForm);

        /*
         * 注意 form的invalid事件的触发，是每个input元素验证不通过都会触发一次
         */
        formOrder.addEventListener('invalid', handleValidateFail, true);




        // 进入特性检测阶段
        Modernizer.load({
            test: Modernizer.inputtypes.month,
            nope: 'monthpicker.js'
        });

    }

    /**
     * 将一个数值，转换成钱的表示方式， 类似于 ￥***,***这种形式
     * @param value
     */
    function formatMoney(value) {
        return '￥' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    window.addEventListener('load', init, false);
})();
