/*
 ┌───────────────────────────────────────────────────────────────────┐
 │ Copyright (c) 2023년 9월 26일 JerryDEV All rights reserved.        │
 └───────────────────────────────────────────────────────────────────┘
 */

/*
작성자 : Min Woo Song
작성일 : 2023-09-26
작성시간 : 오후 7:45
작성용도 : Related Bulletin Javascript Files
*/

function writing(category_no) {
    const form = $("form[name='writeForm']");
    $("#category").attr("value", category_no);
    form.attr("action", "../board/write");
    form.attr("method", "get");
    form.submit();
}

const formObj = $("form[role='form']");

function postingList(category_no) {
    const form = $("form[id='list']");
    $("#category_no").attr("value", category_no);
    form.attr("action", "../board/list");
    form.attr("method", "get");
    form.submit();
}

function paging(page, category_no) {
    const formObj = $("form[name='listForm']");
    $("#pageNum").attr("value", page);
    $("#CATEGORY_NO").attr("value", category_no);
    formObj.attr("action", "../board/list");
    formObj.attr("method", "get");
    formObj.submit();
}

function goPage(board_no) {
    const form = $("form[name='readForm']");
    $("#boardNo").attr("value", board_no);
    form.attr("action", "../board/read");
    form.attr("method", "post");
    form.submit();
}

function cancelPage(board_no) {
    const form = $("form[name='detailsForm']");
    $("#boardNo").attr("value", board_no);
    form.attr("action", "../board/read");
    form.attr("method", "post");
    form.submit();
}

window.addEventListener("DOMContentLoaded", function () {

    $(".listBtn").click(function () {
        formObj.attr("action", "../board/list");
        formObj.attr("method", "post");
        formObj.submit();
    });

    $(".modBtn").click(function () {
        formObj.attr("action", "../board/edit");
        formObj.attr("method", "post");
        formObj.submit();
    });

    $(".crystalBtn").click(function () {
        $.ajax({
            type: "post",
            url: "../board/modifyPostingProcess",
            data: {
                board_no: $("#updateBoardNo").val(),
                category_no: $("#categoryList").val(),
                board_title: $("#title").val(),
                board_content: $("#content").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.result == "error") {
                    location.reload();
                } else {
                    alert("게시글 수정에 성공 하였습니다.");
                    goPage($("#updateBoardNo").val());
                }
            }
        })
    });

    $(".delBtn").click(function () {
        if (confirm("해당 게시글을 정말로 삭제 하시겠습니까??")) {
            $.ajax({
                type: "post",
                url: "../board/deletePosting",
                data: {
                    boardNo: $("#boardNo").val()
                },
                dataType: "json",
                success: function (data) {
                    if (data.result == "success") {
                        alert("게시글 삭제에 성공 하였습니다.");
                        location.href = "../board/list"
                    }
                }
            })
        }
    });

    var getTotalLikeCount = function () {
        $.ajax({
            type: "post",
            url: "../board/getTotalLikeCount",
            data: {
                board_no: $("#boardNo").val()
            },
            dataType: "json",
            success: function (data) {
                $("#likeCount").text("좋아요 수(" + data.totalLikeCount + ")");
            }
        });
    }

    const boardLike = document.getElementById('boardLike');
    var getMyLikeStatus = function () {
        $.ajax({
            type: "post",
            url: "../board/getMyLikeStatus",
            data: {
                user_no: $("#userNo").val(),
                board_no: $("#boardNo").val()
            },
            dataType: "json",
            // contentType : "application/x-www-form-urlencoded", // post
            success: function (data) {
                if (data.result == 'error') {
                    console.log(data.reason);
                } else if (data.status == 'like') {
                    boardLike.innerText = '좋아요 취소';
                    boardLike.className += "fa-regular fa-thumbs-down";
                } else if (data.status == 'unlike') {
                    boardLike.innerText = '좋아요';
                    boardLike.className += 'fa-regular fa-thumbs-up';
                }
            }
        });
    }

    if (location.pathname.includes('read')) {
        getMyLikeStatus();
    }

    $("#boardLike").click(function () {
        $.ajax({
            type: "post",
            url: "../board/doLike",
            data: {
                board_no: $("#boardNo").val(),
                user_no: $("#userNo").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.status == "unlike") {
                    alert("게시글 좋아요를 완료 하였습니다.");
                    location.reload();
                } else {
                    alert("게시글 좋아요를 취소 하였습니다.");
                    location.reload();
                }
            }
        });
    });
})