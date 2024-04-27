/*
 ┌───────────────────────────────────────────────────────────────────┐
 │ Copyright (c) 2023년 10월 23일 JerryDEV All rights reserved.       │
 └───────────────────────────────────────────────────────────────────┘

 */

window.addEventListener("DOMContentLoaded", function () {
    var printReplyCount = function (totalCount) {
        var commentCount = $(".commentCount");
        var collapsedBox = $(".collapsed-box");

        if (totalCount <= 0) {
            commentCount.html(" 댓글이 없습니다. 의견을 남겨주세요");
            collapsedBox.find(".btn-box-tool").remove();
            return;
        }
        commentCount.html(" 댓글목록 (" + totalCount + ")");
        collapsedBox.find(".box-tools").html(
            "<button type='button' class='btn btn-box-tool' data-widget='collapse'>"
            + "<i class='fa fa-plus'></i>"
            + "</button>"
        );
    };

    var commentList = function () {
        $.ajax({
            type: "post",
            url: "../comment/getCommentList",
            data: {
                board_no: $("#boardNo").val()
            },
            dataType: "json",
            success: function (data) {
                printReplyCount(data.totalCommentCount);
            }
        });
    }

    commentList();

    $(".commentAddBtn").click(function () {
        $.ajax({
            type: "post",
            url: "../comment/writeComment",
            data: {
                board_no: $("#boardNo").val(),
                comment_content: $("#newCommentText").val()
            },
            dataType: "json",
            success: function (data) {
                if (data == "error") {
                    alert("서버와 통신중 에러가 발생했습니다. 다시 확인해주세요");
                } else {
                    alert("댓글 작성에 성공 하였습니다.");
                    location.reload();
                }
            }
        });
    });
    $(".modalModBtn").click(function () {
        $.ajax({
            type: "post",
            url: "../comment/commentModify",
            data: {
                comment_no: $(".commentNo").val(),
                user_no: $(".userNo").val(),
                comment_content: $(".commentText").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.result == 'fail') {
                    alert("댓글 수정에 실패 하였습니다 다시 확인해주세요");
                } else {
                    alert("댓글 수정에 성공 하였습니다.");
                    $('modModal').modal('hide');
                    location.reload();
                }
            }
        });
    });

    $(".modalDelBtn").click(function () {
        $.ajax({
            type: "post",
            url: "../comment/deleteComment",
            data: {
                comment_no: $(".commentNo").val()
            },
            dataType: "json",
            success: function (data) {
                alert("댓글 삭제가 완료 되었습니다.");
                $('delModal').modal('hide');
                location.reload();
            }
        })
    });
});

/** 댓글 수정 모둘 출력*/
function modifyComment(commentNo, userNo) {
    var comment = $(".commentDiv");
    if (confirm('해당 댓글을 수정 하시겠습니까??')) {
        $('.commentNo').val(commentNo);
        $('.userNo').val(userNo);
        $('#modModal').modal('show');
        $('#modModal').on('shown.bs.modal', function (e) {
            $('.commentText').val(comment.find('.oldReplytext').text());
        });
    } else {
        location.reload();
    }
}

function deleteComment(commentNo) {
    if (confirm('해당 댓글을 삭제 하시겠습니까??')) {
        $('.commentNo').val(commentNo);
        $('#delModal').modal('show');
    } else {
        location.reload();
    }
}

function doCommentLike(commentNo, userNo) {
    $.ajax({
        type: "post",
        url: "../comment/doCommentLike",
        data: {
            user_no: userNo,
            comment_no: commentNo
        },
        dataType: "json",
        success: function (data) {
            if (data.status == 'like') {
                alert("댓글 추천 하였습니다.");
                $("#likeCheck").attr("class", "fa fa-thumbs-o-down");
                totalCommentLikeCount(commentNo);
                location.reload();
            } else if (data.status == 'unlike') {
                alert("댓글 추천을 취소 하였습니다.");
                $("#likeCheck").attr("class", "fa fa-thumbs-o-up");
                totalCommentLikeCount(commentNo);
                location.reload();
            }
        }
    });
}

function totalCommentLikeCount(commentNo) {
    $.ajax({
        type: "post",
        url: "../comment/getTotalCommentLikeCount",
        data: {
            comment_no: commentNo
        },
        dataType: "json",
        success: function (data) {
            $(".commentLike").find(".totalCommentLikeCount").html("(" + data.totalCommentLikeCount + ")");
        }
    });
}