/*
 ┌───────────────────────────────────────────────────────────────────┐
 │ Copyright (c) 2023년 8월 8일 JerryDEV All rights reserved.         │
 └───────────────────────────────────────────────────────────────────┘
 */

/*
작성자 : Min Woo Song
작성일 : 2023-08-08
작성시간 : 오전 4:15
작성용도 : Javascript file associated with personal profile page
*/

window.addEventListener("DOMContentLoaded", function () {

    var code = "";
    $("#CertifiedEmailButton").click(function () {
        $.ajax({
            type: "post",
            url: "./checkUserInfo",
            data: {
                user_email: $("#userEmail").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.result == "error") {
                    alert("서버와 통신중 에러가 발생했습니다.");
                    $("#alertCertified").css({
                        "color": "rad",
                        "font-size": "10px"
                    });
                    $("#alertCertified").text("!  서버 통신중 에러가 발생 하였습니다.");
                } else {
                    alert("인증번호 발송이 완료되었습니다. 입력한 이메일에서 인증번호 확인을 해주세요.");
                    $("#alertCertified").text("! 인증번호를 입력해주세요.")
                    $("#alertCertified").css({
                        "color": "red",
                        "font-size": "10px"
                    });
                    code = data.code;
                    $("#userCertified").attr("disabled", false);
                    $("#CertifiedEmailButton").attr("disabled", true);
                }
            }
        });
    });

    $("#userCertified").keyup(function() {
        if ($("#userCertified").val().length != 6) {
            $("#alertCertified").text("! 인증번호가 일치하지 않습니다. 다시 확인해주시기 바랍니다.")
            $("#alertCertified").css({
                "color": "red",
                "font-size": "10px"
            });
        } else if ($("#userCertified").val() == code) {
            $("#alertCertified").text("✔ 메일인증이 완료되었습니다.")
            $("#alertCertified").css({
                "color": "green",
                "font-size": "10px"
            });
            $("#userCertified").attr("disabled", true);
            $("#updateInfo").attr("disabled", false);
        }
    });

    $("#updateInfo").click(function() {
        $.ajax({
            type: "post",
            url: "./updateInfoUser",
            data: {
                user_id: $("#inputUserId").val(),
                user_nickname: $("#userNickName").val(),
                user_phone: $("#userPhone").val(),
                user_email: $("#userEmail").val(),
                question_no: $("#userQuestion").val(),
                user_findAnswer: $("#userFindAnswer").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.result == 'fail') {
                    alert("로그인을 먼저 진행한 이후에 변경을 진행해 주세요.");
                    location.href = "/main/main";
                    return;
                } else {
                    alert("변경에 성공 하였습니다 다시 로그인 해주세요.");
                    location.reload();
                }
            }
        });
    });

    $("#checkPassword").click(function () {
        $.ajax({
            type: "post",
            url: "./checkPw",
            data: {
                user_id: $("#inputId").val(),
                current_password: $("#currentPassword").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.result == 'fail') {
                    $("#currentMessage").css({
                        "color": "#6667ab",
                        "font-size": "10px"
                    });
                    $("#currentMessage").text("!  현재 비밀번호와 일치 하지 않습니다. 다시 확인해주세요");
                } else {
                    $("#currentMessage").css({
                        "color": "#6667ab",
                        "font-size": "10px"
                    });
                    $("#currentMessage").text("✔  현재 비밀번호와 일치 합니다.");
                    $("#currentPassword").attr("disabled", true);
                    $("#newPassword").attr("disabled", false);
                }
            }
        });
    });

    $("#newPasswordCheck").click(function () {
        var value = $("#newPassword").val();

        var num = value.search(/[0-9]/g);
        var eng = value.search(/[a-z]/ig);
        var spe = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

        if (value.length < 8 || value.length > 30) {
            $("#alertNewPassword").css({
                "color": "6667ab",
                "font-size": "10px"
            });
            $("#alterPassword").text("!  비밀번호는 8자리이상 30자리 이하여야 합니다.")
        } else if (value.replace(/\s|　/gi, "").length == 0) {
            $("#alertNewPassword").css({
                "color": "6667ab",
                "font-size": "10px"
            });
            $("#alertNewPassword").text("!  비밀번호에 공백은 사용할 수 없습니다.")
        } else if (num < 0 || eng < 0 || spe < 0) {
            $("#alertNewPassword").css({
                "color": "6667ab",
                "font-size": "10px"
            });
            $("#alertNewPassword").text("!  비밀번호는 영어+숫자+특수문자로 이루어져야 합니다.")
        } else {
            $("#alertNewPassword").css({
                "color": "6667ab",
                "font-size": "10px"
            });
            $("#alertNewPassword").text("✔  사용가능한 비밀번호입니다.");
            $("#checkingNewPassword").attr("disabled", false);
        }
    });

    $("#newPasswordCheck2").click(function() {
        var value = $("#newPassword").val();
        if (value != $("#checkingNewPassword").val()) {
            $("#alertCheckingPassword").css({
                "color": "red",
                "font-size": "12px"
            });
            $("#alertCheckingPassword").text("!  비밀번호가 일치하지 않습니다.")
            return;
        }
        ;
        $("#alertCheckingPassword").css({
            "color": "green",
            "font-size": "10px"
        });
        $("#alertCheckingPassword").text("✔  비밀번호가 일치합니다.");
        $("#newPassword").attr("disabled", true);
        $("#checkingNewPassword").attr("disabled", true);
        $("#modifyPw").attr("disabled", false);
    });


    $("#modifyPw").click(function () {
        $.ajax({
            type: "post",
            url: "./modifyPassword",
            data: {
                user_id: $("#inputId").val(),
                user_pw: $("#checkingNewPassword").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.result == 'fail') {
                    alert("비밀번호 변경에 실패 하였습니다. 다시 확인해주세요");
                } else {
                    alert("비밀번호 변경에 성공하였습니다");
                    location.reload();
                }
            }
        });
    });

    $("#checkPassword2").click(function() {
        $.ajax({
            type: "post",
            url: "./checkPw",
            data: {
                user_id: $("#inputDeleteId").val(),
                current_password: $("#currentPassword2").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.result == 'fail') {
                    $("#currentMessage2").css({
                        "color": "#6667ab",
                        "font-size": "10px"
                    });
                    $("#currentMessage2").text("!  현재 비밀번호와 일치 하지 않습니다. 다시 확인해주세요");
                } else {
                    $("#currentMessage2").css({
                        "color": "#6667ab",
                        "font-size": "10px"
                    });
                    $("#currentMessage2").text("✔  현재 비밀번호와 일치 합니다.");
                    $("#currentPassword2").attr("disabled", true);
                    $("#deleteUser").attr("disabled", false);
                }
            }
        });
    });

    $("#deleteUser").click(function () {
        $.ajax({
            type: "post",
            url: "../user/deleteUserInfoByUserNo",
            data: {
                user_id: $("#inputDeleteId").val(),
                user_pw: $("#currentPassword2").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.result == 'fail') {
                    alert("로그인을 하신후에 회원 탈퇴를 진행해주세요");
                } else {
                    alert("회원탈퇴에 성공 하였습니다.");
                    location.reload();
                }
            }
        });
    });
});