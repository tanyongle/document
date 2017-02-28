/// <reference path="../jquery-1.8.0.min.js" />
/// <reference path="Common.js" />

var Validate = {

    //为空校验
    emptyValidate: function (ele, msg) {
        ele = Common.getJqueryObj(ele);
        var vlaue = ele.val();
        if ($.trim(vlaue) == "") { //未输入值
            if (msg == null || msg.length == 0) {
                msg = ele.attr("msg");
            }
            this.removeMessage(ele);
            this.showMessage(ele, msg);
            return false;
        }
        return true;
    },

    //密码规则校验
    passwordValidate: function (ele, minLength, maxLength, msg) {
        ele = Common.getJqueryObj(ele);
        var regExp = new RegExp("^[a-zA-Z0-9]{" + minLength.toString() + "," + maxLength.toString() + "}$"); //字母（区分大小写）+数字
        var value = ele.val();
        var isPass = regExp.test(value);

        if (isPass == false) {
            this.removeMessage(ele);
            if (msg == null || msg.length == 0) {
                msg = "密码必须为" + minLength.toString() + "-" + maxLength.toString() + "位的字母或数字";
            }
            this.showMessage(ele, msg);
        }

        return isPass;
    },

    //中为校验
    chineseCharactersValidate: function (ele, msg) {
        ele = Common.getJqueryObj(ele);
        var regExp = new RegExp("^[\\u4e00-\\u9fa5]+$");
        var isPass = regExp.test(ele.val());
        if (isPass == false) {
            if (msg == null || msg.length == 0) {
                msg = "请输入正确的户名";
            }
            this.removeMessage(ele);
            this.showMessage(ele, msg);
        }
        return isPass;
    },
    //密码确认校验
    passwordConfirm: function (pw1, pw2, msg) {
        pw1 = $(pw1);
        pw2 = $(pw2);
        var value1 = pw2.val();
        var value2 = pw2.val();
        if (value1.length > 0 && value2.length > 0 && pw1.val() != pw2.val()) {
            this.removeMessage(pw2);
            if (msg == null || msg.length == 0) {
                msg = "两次所填写的密码不一致，请重新输入";
            }
            this.showMessage(pw2, msg);
            return false;
        }
        return true;
    },

    //验证身份证
    aCity: {
        11: "北京", 12: "天津", 13: "河北", 14: "山西",
        15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江",
        31: "上海", 32: "江苏", 33: "浙江", 34: "安徽",
        35: "福建", 36: "江西", 37: "山东", 41: "河南",
        42: "湖北", 43: "湖南", 44: "广东", 45: "广西",
        46: "海南", 50: "重庆", 51: "四川", 52: "贵州",
        53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
        63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾",
        81: "香港", 82: "澳门", 91: "国外"
    },

    //身份证格式验证
    CertNoValidate: function (ele) {
        ele = Common.getJqueryObj(ele);
        var value = ele.val();

        var iSum = 0;
        if (!/^\d{17}(\d|x)$/i.test(value)) {
            this.removeMessage(ele);
            this.showMessage(ele, "输入的身份证号长度或格式不正确");
            return false;
        }
        if (this.aCity[parseInt(value.substr(0, 2))] == null) {
            this.removeMessage(ele);
            this.showMessage(ele, "你的身份证号地区非法");
            return false;
        }
        value = value.replace(/x$/i, "a");
        for (var i = 17; i >= 0; i--) {
            iSum += (Math.pow(2, i) % 11) * parseInt(value.charAt(17 - i), 11);
        }
        if (iSum % 11 != 1) {
            this.removeMessage(ele);
            this.showMessage(ele, "你输入的身份证号非法");
            return false;
        }

        return true;
    },

    //手机格式验证
    MobileValidate: function (ele, msg) {
        ele = Common.getJqueryObj(ele);
        var regExp = new RegExp("^1[358]\\d{9}$");
        var isPass = regExp.test(ele.val());
        if (isPass == false) {
            this.removeMessage(ele);
            if (msg == null || msg.length == 0) {
                msg = "请输入有效的手机号";
            }
            this.showMessage(ele, msg);
        }
        return isPass;
    },

    //银行卡格式验证
    AccountNoValidate: function (ele, msg) {
        ele = Common.getJqueryObj(ele);
        var regExp = new RegExp("^\\d{8,30}$");
        var value = Common.clearSpace(ele.val());
        var isPass = regExp.test(value);
        if (isPass == false) {
            this.removeMessage(ele);
            if (msg == null || msg.length == 0) {
                msg = "请输入正确的卡号";
            }
            this.showMessage(ele, msg);
        }
        return isPass;
        return true;
    },

    //邮箱地址格式验证
    EmailValidate: function (ele, msg) {
        ele = Common.getJqueryObj(ele);
        var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        var isPass = email.test(ele.val());
        if (isPass == false) {
            this.removeMessage(ele);
            if (msg == null || msg.length == 0) {
                msg = "请输入有效的邮箱地址";
            }
            this.showMessage(ele, msg);
        }
        return isPass;
    },

    //显示错误消息
    showMessage: function (ele, msg) {
        ele = Common.getJqueryObj(ele);
        var extraClass = ele.attr("extraClass") || "";

        var html = "<div name='customTip' class='ui-tips tips-error " + extraClass + "' style='display: block;'><span></span><i></i><div class='warm-box'>" + msg + "</div></div>";
        ele.after(html);
        ele.addClass("on-error");
    },

    //显示正确消息
    showSuccess: function (ele) {
        ele = Common.getJqueryObj(ele);
        var extraClass = ele.attr("extraClass") || "";
        //先移除错误消息
        this.removeMessage(ele);
        //再显示正确样式
        var html = "<div name='customTip' class='ui-tips tips-correct " + extraClass + "' style='display:block;'></div>";
        ele.after(html);
    },

    //移除消息
    removeMessage: function (ele) {
        ele = Common.getJqueryObj(ele);
        ele.removeClass("on-error");
        ele.siblings("div[name='customTip']").remove();
    },

    //字符长度校验
    charLenValidate: function (ele, msg) {
        ele = Common.getJqueryObj(ele);
        var vlaue = ele.val();
        if ($.trim(vlaue).length < 2) { //两位以上中文字符
            if (msg == null || msg.length == 0) {
                msg = ele.attr("msg");
            }
            this.removeMessage(ele);
            this.showMessage(ele, msg);
            return false;
        }
        return true;
    }

}
