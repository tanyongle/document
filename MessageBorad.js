var MessageBorad = {

    init: function () {

        //姓名校验
        $("#username").bind("blur", function () {
            if (MessageBorad.emptyValidate(this, "请输入姓名") == false) return;
            if (MessageBorad.chineseCharactersValidate(this, "仅支持中文") == false) return;
            MessageBorad.showSuccess(this);
        });

        //手机号校验
        $("#mobile").bind("blur", function () {
            if ($.trim($(this).val()) != "") { if (MessageBorad.MobileValidate(this) == false) return; }
            MessageBorad.showSuccess(this);
        });

        //邮箱验证
        $("#email").bind("blur", function () {
            if (MessageBorad.emptyValidate(this, "请输入邮箱") == false) return;
            if (MessageBorad.EmailValidate(this, "请输入有效的邮箱地址") == false) return;
            MessageBorad.showSuccess(this);
        });

        //内容验证
        $("#content").bind("blur", function () {
            if (MessageBorad.emptyValidate(this, "请输入内容") == false) return;
            MessageBorad.showSuccess(this);
        });


        $("#btnSubmit").click(function () {
            //校验通过，弹出确认框
            if (MessageBorad.formCheck() === true) {
                MessageBorad.submit("btnSubmit");
            }
        });

    },

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

    //移除消息
    removeMessage: function (ele) {
        ele = Common.getJqueryObj(ele);
        ele.parent().removeClass("error");
        ele.next(0).remove();
    },

    //显示错误消息
    showMessage: function (ele, msg) {
        ele = Common.getJqueryObj(ele);
        var html = "<span class='error-text'>" + msg + "</span>";
        ele.after(html);
        ele.parent().addClass("error");
    },

    //显示正确消息
    showSuccess: function (ele) {
        ele = Common.getJqueryObj(ele);
        //先移除错误消息
        this.removeMessage(ele);
    },

    formCheck: function () {

        //姓名
        var ele = $("#username");
        if (MessageBorad.emptyValidate(ele, "请输入姓名") == false) return false;
        if (MessageBorad.chineseCharactersValidate(ele, "仅支持中文") == false) return false;

        //手机号
        ele = $("#mobile");
        if ($.trim(ele.val()) != "") { if (MessageBorad.MobileValidate(ele) == false) return; }

        //邮箱
        ele = $("#email");
        if (MessageBorad.emptyValidate(ele, "请输入邮箱") == false) return;
        if (MessageBorad.EmailValidate(ele, "请输入有效的邮箱地址") == false) return;

        //验证码验证
        ele = $("#content");
        if (MessageBorad.emptyValidate(ele, "请输入内容") == false) return false;

        return true;
    },

    clearForm: function () {
        $(':input[type=text]', '#formmessage').val('');
        $('textarea', '#formmessage').val('');
    },

    submit: function (eleID) {

        var url = "/Ajax/AddMessageBoard";
        var board = { "username": $("#username").val(), "mobile": $("#mobile").val(), "email": $("#email").val(), "content": $("#content").val() };

        //提交
        $.ajax({
            async: true,
            type: "post",
            url: url,
            dataType: "text",
            data: board,
            success: function (data) {
                var jsonResult = Common.parseJson(data);
                if (jsonResult.IsSuccess === true) {
                    $("#tip").html("您的信息已提交，感谢您的支持！");
                    MessageBorad.clearForm();
                }
                else {
                    $("#tip").html(jsonResult.Message);
                }
                $("#fb-resault").show();
                $("#J_popup_fb").hide();

            },
            error: function (e) {
                $("#tip").html("系统出现异常，请联系管理员");
                $("#fb-resault").show();
                $("#J_popup_fb").hide();
            }
        });
    }
}

$(function () {
    MessageBorad.init();
});


function checkLength(which) {
    var maxChars = 200;
    if (which.value.length > maxChars)
        which.value = which.value.substring(0, maxChars);
    var curr = maxChars - which.value.length;
    document.getElementById("j-txt-limit").innerHTML = curr.toString();
}
