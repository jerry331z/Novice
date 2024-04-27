/*
 ┌───────────────────────────────────────────────────────────────────┐
 │ Copyright (c) 2023년 7월 14일 JerryDEV All rights reserved.        │
 └───────────────────────────────────────────────────────────────────┘
 */

/*
  작성자 : jason331z
  작성일시 : 2023-07-14
  작성시간 : 오후 1:15
  작성용도 : Web login related JavaScript files
*/

window.addEventListener("DOMContentLoaded", function () {

    /* 로그인 Ajax 호출 부분 */
    $("#inputId").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#loginButton").click();
        }
    });

    $("#inputPw").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#loginButton").click();
        }
    });

    var userInputId = getCookie("userInputId");
    var setCookieYN = getCookie("setCookieYN");

    if (setCookieYN == 'Y') {
        $("#saveIdBox").prop("checked", true);
    } else {
        $("#saveIdBox").prop("checked", false);
    }

    $("#inputId").val(userInputId);

    $("#loginButton").click(function () {

        var id = $("#inputId").val();
        var pw = $("#inputPw").val();

        if (id.replace(/\s|　/gi, "").length == 0) {
            alert("!   아이디를 입력해주세요");
            return;
        }

        if (pw.replace(/\s|　/gi, "").length == 0) {
            alert("!   패스워드를 입력해주세요");
            return;
        }
        $.ajax({
            type: "post",
            url: "../user/userLoginProcess",
            data: {
                user_id: $("#inputId").val(),
                user_pw: $("#inputPw").val(),
                useCookie: $("#userCookie").prop("checked"),
                saveCookie: $("#saveIdBox").prop("checked")
            },
            dataType: "json",
            success: function (data) {
                if (data.result == "success") {
                    alert("로그인에 성공 하였습니다");
                    location.href = data.redirect;
                } else if (data.result == "out") {
                    if (confirm("비활성화된 계정입니다. 계정 활성화 페이지로 이동하시겠습니까?") == true) {
                        location.href = "../user/userLogoutProcess";
                        location.href = "../user/userRecoveryPage";
                    } else {
                        location.href = "../main/main";
                    }
                } else {
                    alert("로그인에 실패하였습니다. 아이디와 비밀번호를 확인해 주세요.");
                }
            }
        });
    });

    $("#logoutButton").click(function () {
        if (confirm("로그아웃 하시겠습니까?")) {
            $.ajax({
                type: "post",
                url: "../user/userLogoutProcess",
                // contentType : "application/x-www-form-urlencoded", // post
                dataType: "json",
                success: function (data) {
                    location.href = "/";
                }
            });
        }
    });
});

//쿠키값 가져오기
function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');

    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, ''); // 공백 제거

        if (x == cookie_name) {
            return unescape(y);
        }
    }
}