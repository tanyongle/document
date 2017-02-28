/// <reference path="../jquery-1.8.0.min.js" />

var Common = {

    showMessage: function (msg) {
        alert(msg);
    },

    parseJson: function (text) {
        try {
            return JSON.parse(text); //ie 89 ff ch
        } catch (e) {
            return eval('(' + text + ')'); //ie7
        }
    },

    //获取Jquery对象
    getJqueryObj: function (ele) {
        //是ID
        if (typeof ele == "string") {
            if (ele.indexOf("#") == 0) {
                ele = $(ele);
            }
            else {
                ele = $("#" + ele);
            }
        }
        //是dom对象
        if ((ele instanceof jQuery) == false) {
            ele = $(ele);
        }
        return ele;
    },

    //银行卡号每4位用空格隔开
    bankCardFormat: function (ele) {
        ele = this.getJqueryObj(ele);
        var value = this.clearSpace(ele.val()).replace(/(\d{4})(?=\d)/g, "$1" + " ") //每4位用空格隔开
        ele.val(value);
    },

    //去掉空格
    clearSpace: function (value) {
        return value.replace(/\s/g, "");
    },

    //金额用千分符表示，默认保留2位小数
    moneyFormat: function (value, decimalPlaces) {
        if (value == null || value.length == 0) return "";
        var parseValue = parseFloat(value);
        decimalPlaces = decimalPlaces == null ? 2 : decimalPlaces; //默认保留2位小数
        if (parseValue >= 0) {
            var re = /\d{1,3}(?=(\d{3})+$)/g;
            var n1 = parseValue.toFixed(decimalPlaces).replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) { return s1.replace(re, "$&,") + s2; });
            return n1;
        }
        else {
            var temp = parseValue.toFixed(decimalPlaces).replace("-", "");
            var re = /\d{1,3}(?=(\d{3})+$)/g;
            var n1 = temp.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) { return s1.replace(re, "$&,") + s2; });
            return "-" + n1;
        }
    },

    //去掉千分符
    clearCommas: function (value) {
        return value.replace(/,/g, "");
    },

    //只能输入整数
    onlyInteger: function () {
        this.onlyDigitValue([109, 189]); //整数可输入-号
    },

    //只能输入正整数
    onlyPositiveInteger: function () {
        this.onlyDigitValue([])
    },

    //只能输入数字
    onlyDecimal: function () {
        this.onlyDigitValue([109, 189, 110, 190])//数字可输入- .号
    },

    //只能输入正数
    onlyPositiveDecimal: function () {
        this.onlyDigitValue([110, 190]); //正数可输入.
    },

    //只能输入数字
    onlyDigitValue: function (arr) {

        var keyCode = event.keyCode;

        //允许按Ctrl, Shift, Tab
        if (event.ctrlKey || event.shiftKey || keyCode == 9) {
            event.returnValue = true;
            return;
        }
        /*
        8   =BackSpace
        9   =Tab
        37  =Left Arrow
        39  =Right Arrow
        46  =Delete
        48  =0
        49  =1
        ...
        57  =9
        96  =0
        ...
        105 =9
        109 =-
        189 =-
        110 =.
        190 =.
        */

        if (event.ctrlKey && keyCode == 65) { //Ctrl+A
            event.returnValue = true;
            return;
        }

        if ((keyCode >= 48 && keyCode <= 57)
        || (keyCode >= 96 && keyCode <= 105)
        || keyCode == 8
        || keyCode == 37
        || keyCode == 39
        || keyCode == 46
        || $.inArray(keyCode, arr) > -1
        ) {
            event.returnValue = true;
        }
        else {
            event.returnValue = false;
        }
    },

    //密码强度计算
    GetPasswordLevel: function (pwd) {

        var lowerCasePattern = /[a-z]{1,}/;
        var upperCasePattern = /[A-Z]{1,}/;
        var numberPattern = /[0-9]{1,}/;

        //强：大于等于8位；字母或数字乱序组合；字母包含大小写。这三个条件同时满足
        if (pwd.length >= 8
            && lowerCasePattern.test(pwd) //包含小写字符
            && upperCasePattern.test(pwd)//包含大写字符
            && numberPattern.test(pwd))//包含数字
        {
            return 3;
        }

        //中：字母或者数字乱序组合；
        if ((lowerCasePattern.test(pwd) || upperCasePattern.test(pwd)) //包含小写字符或包含大写字符            
            && numberPattern.test(pwd))//包含数字
        {
            return 2;
        }

        //弱：字母或者数字其中一种按顺位进行组合；
        var pattern = /^[a-zA-Z0-9]{8,}$/;
        if (pattern.test(pwd)) {
            return 1;
        }

        return 0;
    }
}

