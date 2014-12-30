(function (window, document) {
    'use strict';
    var className = "tip-js",
        defaults = {
        offsetY: 10, // Vertical offset
        offsetX: 10  // Horizontal offset
    };

    function Tip(options) {
        this.options = extend(defaults, options);
        this.refresh();
    }

    Tip.prototype = {
        refresh: function () {
            var elementList = document.getElementsByClassName(className);
            DOMOperation("add", elementList, this);
        },

        dispose: function () {
            var elementList = document.getElementsByClassName(className);
            DOMOperation("remove", elementList);
        }

    };

    function extend(from, to) {
        var obj = {},
            temp;
        for (temp in from) {
            if (from.hasOwnProperty(temp)) {
                obj[temp] = from[temp];
            }
        }
        for (temp in to) {
            if (to.hasOwnProperty(temp)) {
                obj[temp] = to[temp];
            }
        }
        return obj;
    }

    function DOMOperation(type, elementList, scope) {
        var i = 0,
            len,
            el,
            result = DOMAttachType(type),
            prefix =  result.prefix,
            isAdd =  result.isAdd;

        type = result.type;

        if (elementList && elementList.length == 0) {
            return;
        }

        for (len = elementList.length; i < len; i++) {
            el = elementList[i];
            if(isAdd){
                el.tipJs= {
                    scope : scope
                };
            }
            el[type](prefix + "mouseenter", mouseEnter, false);
            el[type](prefix + "mousemove", mouseMove, false);
            el[type](prefix + "mouseleave", mouseLeave, false);
        }
    }

    function mouseEnter(e) {
        var that = this,
            title = that.getAttribute('title'),
            toolTip = document.createElement("div"),
            tipJs = that.tipJs;
        toolTip.innerHTML = title;
        toolTip.className = className + "-title";

        tipJs.title = title;
        tipJs.toolTip = toolTip;

        this.removeAttribute('title');
        document.body.appendChild(toolTip);
        mouseMove.bind(this, e);
    }

    function mouseMove(e) {
        var tipJs = this.tipJs,
            toolTip = tipJs.toolTip,
            scope = tipJs.scope;

        toolTip.style.top = (e.pageY + scope.options.offsetY) + "px";
        toolTip.style.left = (e.pageX + scope.options.offsetX ) + "px";

    }

    function mouseLeave() {
        var tipJs = this.tipJs;
        this.setAttribute("title", tipJs.title);
        tipJs.title = "";

        document.body.removeChild(tipJs.toolTip);
        tipJs.toolTip =  null;
    }

    function DOMAttachType(type) {
        var result,
            prefix = "on",
            isAdd = false;

        if (type == "add") {
            if (document.addEventListener) {  //fallback for older browser
                result = "addEventListener";
                prefix = "";
            } else {
                result = "attachEvent";
            }
            isAdd = true;
        } else {
            if (document.removeEventListener) {  //fallback for older browser
                result = "removeEventListener";
                prefix = "";
            } else {
                result = "detachEvent";
            }
        }

        return {
            type: result,
            prefix: prefix,
            isAdd: isAdd
        };
    }

    window.tipJs = Tip;
})(window, document);