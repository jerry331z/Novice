/*
 ┌───────────────────────────────────────────────────────────────────┐
 │ Copyright (c) 2023년 7월 24일 JerryDEV All rights reserved.        │
 └───────────────────────────────────────────────────────────────────┘
 */

/*
작성자 : Min Woo Song
작성일 : 2023-07-24
작성시간 : 오후 6:30
작성용도 : Find ID Password related JavaScript files
*/


window.addEventListener("DOMContentLoaded", function () {
    $("#findId").click(function () {
        $("#userIdFindModel").modal('show');
    });

    $("#findPassword").click(function () {
        $("#userPwFindModel").modal('show');
    });

    /* 아이디 찾기 */
    $("#findIdButton").click(function () {
        $.ajax({
            type: "post",
            url: "../user/getUserIdByNickNameAndEmail",
            data: {
                user_nickname: $("#user_nickname").val(),
                user_email: $("#user_email").val()
            },
            dataType: "json",
            // contentType : "application/x-www-form-urlencoded", // post
            success: function (data) {
                if (data.result == 'fail') {
                    $("#answerLine").css({
                        "color": "red",
                        "text-align": "center",
                        "text-size": "10px"
                    });
                    $("#answerLine").text("일치하는 아이디가 없습니다. 다시 확인해주세요.");
                } else {
                    $("#answerLine").css({
                        "color": "green",
                        "text-align": "center",
                        "text-size": "10px"
                    });
                    $("#answerLine").text('찾으시는 ID는 "' + data.userInfo.USER_ID + '" 입니다.');
                }
            }
        });
    });

    /* 비밀번호 찾기 질문 조회 */
    $("#findQuestionButton").click(function () {
        $.ajax({
            type: "post",
            url: "../user/getUserQuestionById",
            data: {
                user_id: $("#findIdInput").val(),
            },
            dataType: "json",
            //contentType : "application/x-www-form-urlencoded", // post
            success: function (data) {
                if (data.result == 'fail') {
                    $("#question_content").css({
                        "color": "red",
                        "font-size": "10px",
                        "text-align": "center"
                    });
                    $("#question_content").text("일치하는 아이디가 없습니다. 다시 확인해주세요.");
                } else {
                    $("#question_content").css({
                        "color": "green",
                        "font-size": "10px",
                        "text-align": "center"
                    });
                    $("#question_content").text('' + data.userInfo.QUESTION_CONTENT + '');
                }
            }
        });
    });

    $("#findButton").click(function () {
        $.ajax({
            type: "post",
            url: "../user/getUserPwByfindAnswer",
            data: {
                user_id: $("#findIdInput").val(),
                user_findAnswer: $("#findAnswerInput").val(),
            },
            dataType: "json",
            //contentType : "application/x-www-form-urlencoded", // post
            success: function (data) {
                if (data.result == 'fail') {
                    $("#answerLine2").css({
                        "color": "red",
                        "font-size": "10px"
                    });
                    $("#answerLine2").text("답이 올바르지 않습니다. 다시 확인해주세요.");
                } else {
                    $("#answerLine2").css({
                        "color": "green",
                        "font-size": "10px"
                    });
                    $("#answerLine2").text("올바른 답을 입력 하셧습니다. 사용하실 비밀번호를 입력해주세요");
                    $("#question_content").text('');
                    $("#findPwInput").attr("disabled", false);
                }
            }
        });
    });

    $("#findPwInput").keyup(function () {
        var value = $(event.target).val();

        var num = value.search(/[0-9]/g);
        var eng = value.search(/[a-z]/ig);
        var spe = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

        if (value.length < 8 || value.length > 30) {
            $("#answerLine3").css({
                "color": "red",
                "font-size": "10px"
            });
            $("#answerLine3").text("!  비밀번호는 8자리이상 30자리 이하여야 합니다.")
        } else if (value.replace(/\s|　/gi, "").length == 0) {
            $("#answerLine3").css({
                "color": "red",
                "font-size": "10px"
            });
            $("#answerLine3").text("!  비밀번호에 공백은 사용할 수 없습니다.")
        } else if (num < 0 || eng < 0 || spe < 0) {
            $("#answerLine3").css({
                "color": "red",
                "font-size": "10px"
            });
            $("#answerLine3").text("!  비밀번호는 영어+숫자+특수문자로 이루어져야 합니다.")
        } else {
            $("#answerLine3").css({
                "color": "green",
                "font-size": "10px"
            });
            $("#answerLine3").text("✔  사용가능한 비밀번호입니다.");
            $("#updatePW").attr("disabled", false);
        }
    });

    $("#updatePW").click(function () {
        $.ajax({
            type: "post",
            url: "../user/getUserUpdatePw",
            data: {
                user_id: $("#findIdInput").val(),
                user_pw: $("#findPwInput").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.result == 'fail') {
                    alert("해당하는 아이디가 존재 하지 않습니다.");
                } else {
                    alert("비밀번호 변경에 성공 하였습니다.");
                    location.reload();
                }
            }
        });
    });
});