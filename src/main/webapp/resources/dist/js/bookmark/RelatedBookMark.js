/*
 ┌───────────────────────────────────────────────────────────────────┐
 │ Copyright (c) 2023년 10월 17일 JerryDEV All rights reserved.       │
 └───────────────────────────────────────────────────────────────────┘
 */

window.addEventListener("DOMContentLoaded", function () {

    let getMyBookMarkStatus = function () {
        $.ajax({
            type: "post",
            url: "../bookmark/getMyBookMarkStatus",
            data: {
                board_no: $("#boardNo").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.status == "bookMark") {
                    document.getElementById('postingBookMark').innerText = '북마크 취소';
                    document.getElementById('postingBookMark').className += 'fa fa-bookmark'
                } else if (data.status == 'unBookMark') {
                    document.getElementById('postingBookMark').innerText = '북마크';
                    document.getElementById('postingBookMark').className += 'fa fa-bookmark-o';
                }
            }
        });
    }

    const url = location.pathname;

    if (url.includes('read')) {
        getMyBookMarkStatus();
    }

    $("#postingBookMark").click(function () {
        $.ajax({
            type: "post",
            url: "../bookmark/doBookMark",
            data: {
                board_no: $("#boardNo").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.status == "unBookMark") {
                    alert("게시글 북마크에 성공 하였습니다.");
                    location.reload();
                } else if (data.status == "bookMark") {
                    alert("게시글 북마크를 취소 하였습니다.");
                    location.reload();
                }
            }
        });
    });
});

