/*
 * ┌───────────────────────────────────────────────────────────────────┐
 * │ Copyright (c) 2023년 2월 3일 Eden All rights reserved.            │
 * └───────────────────────────────────────────────────────────────────┘
 */

/*
작성일시 : 2023-02-03
작성자 : Eden
작성시간 : 오후 7:03
용도 : User Recover Data json Handling data transfer requests
*/

window.addEventListener("DOMContentLoaded", function () {

    $("#checkingId").click(function () {
        if ($("#userId").val() == '') {
            alert("아이디를 먼저 입력해주세요");
            return;
        }

        $.ajax({
            type: "post",
            url: "../user/checkId",
            data:  {
                user_id: $("#userId").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.result == 'fail') {
                    $("#checkId").css({
                        "color": "red",
                        "font-size": "12px"
                    });
                    $("#checkId").text("!  아이디가 존재 하지 않습니다.");
                } else {
                    $("#checkId").css({
                        "color": "green",
                        "font-size": "12px"
                    });
                    $("#checkId").text("✔  아이디가 존재 합니다.");
                    $("#userNick").attr("disabled", false);
                    $("#checkingNickName").attr("disabled", false);
                    $("#checkingId").attr("disabled", true);
                }
            }
        });
    });

    $("#checkingNickName").click(function () {
        if ($("#userNick").val() == '') {
            alert("이메일을 먼저 입력해주세요");
            return;
        }

        $.ajax({
            type: "post",
            url: "../user/checkNickName",
            data: {
                user_id: $("#userId").val(),
                user_nickname: $("#userNick").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.result == 'fail') {
                    $("#checkNickName").css({
                        "color": "red",
                        "font-size": "12px"
                    });
                    $("#checkNickName").text("!  가입 당시 입력하신 닉네임이 아닙니다 다시 확인해주세요");
                } else {
                    $("#checkNickName").css({
                        "color": "green",
                        "font-size": "12px"
                    });
                    $("#checkNickName").text("✔  닉네임이 일치 합니다.");
                    $("#userpw").attr("disabled", false);
                    $("#checkingPw").attr("disabled", false);
                    $("#checkingNickName").attr("disabled", true);
                }
            }
        });
    });

    $("#checkingPw").click(function () {
        if ($("#userpw").val() == '') {
            alert("비밀번호를 먼저 입력해주세요");
            return;
        }

        $.ajax({
            type: "post",
            url: "../user/checkPw",
            data: {
                user_id: $("#userId").val(),
                current_password: $("#userpw").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.result == 'fail') {
                    $("#checkPassword").css({
                        "color": "red",
                        "font-size": "12px"
                    });
                    $("#checkPassword").text("!  현재 비밀번호와 일치 하지 않습니다.");
                } else {
                    $("#checkPassword").css({
                        "color": "green",
                        "font-size": "12px"
                    });
                    $("#checkPassword").text("✔  현재 비밀번호와 일치 합니다.");
                    $("#checkingPw").attr("disabled", true);
                    $("#Email").attr("disabled", false);
                    $("#checkButton").attr("disabled", false);
                }
            }
        });
    });

    var code;

    $("#checkButton").click(function () {
        if ($("#Email").val() == '') {
            alert("이메일을 먼저 입력해주세요");
            return;
        }
        $.ajax({
            type: "post",
            url: "../user/emailCheck",
            data: {
                user_id: $("#userId").val(),
                user_email: $("#Email").val()
            },
            dataType: "json",
            success: function(data) {
                if (data.result == 'fail') {
                    $("#checkEmail").css({
                        "color": "red",
                        "font-size": "12px"
                    });
                    $("#checkEmail").text("!  현재 이메일과 일치 하지 않습니다.");
                } else {
                    $("#checkEmail").css({
                        "color": "green",
                        "font-size": "12px"
                    });
                    $("#checkEmail").text("✔  현재 이메일과 일치 합니다.");
                    alert("인증번호 발송이 완료되었습니다. 입력한 이메일에서 인증번호 확인을 해주세요.");
                    $("#authentication").attr("disabled", false);
                    $("#authenticationButton").attr("disabled", false);
                    $("#checkButton").attr("disabled", true);
                    code = data.code;
                }
            }
        });
    });

    $("#authenticationButton").click(function () {
        if ($("#authentication").val() == '') {
            $("#checkAuthentication").css({
                "color": "green",
                "font-size": "12px"
            });
            $("#checkAuthentication").text("!  인증번호를 먼저 입력해주세요");
            return;
        }

        if (code == $("#authentication").val()) {
            $("#checkAuthentication").css({
                "color": "green",
                "font-size": "12px"
            });
            $("#checkAuthentication").text("✔  메일 인증이 완료 되었습니다.");
            $("#authenticationButton").attr("disabled", true);
            $("#authentication").attr("disabled", true);
            $("#recoveryButton").attr("disabled", false);
        }
    });

    $("#recoveryButton").click(function () {
        $.ajax({
            type: "post",
            url: "../user/recoveryUserByInfo",
            data: {
                user_id: $("#userId").val(),
                user_nickname: $("#userNick").val(),
                user_email: $("#Email").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.result == 'fail') {
                    alert("해당하는 유저 정보가 없습니다 다시 확인해주세요");
                } else {
                    alert("계정 복구에 성공 하였습니다.")
                    location.href = "../main/main";
                }
            }
        });
    });
});