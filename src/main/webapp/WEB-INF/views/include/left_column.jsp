<%--
  ┌───────────────────────────────────────────────────────────────────┐
  │ Copyright (c) 2023년 6월 29일 JerryDEV All rights reserved.        │
  └───────────────────────────────────────────────────────────────────┘
  --%>

<%--
작성자 : Min Woo Song
작성일 : 2023-06-29
작성시간 : PM 3:25
작성용도 : left side menu bar jsp file
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--left_column.jsp--%>
<%-- Left side column. contains the logo and sidebar --%>
<aside class="main-sidebar">

    <%-- sidebar: style can be found in sidebar.less --%>
    <section class="sidebar">

        <%-- Sidebar user panel (optional) --%>
        <div class="user-panel">
            <c:if test="${empty sessionUser}">
                <div class="pull-left image">
                    <img src="/dist/img/default-user-image.jpg" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p>Guest</p>
                        <%-- Status --%>
                    <a href="#"><i class="fa fa-circle text-danger"></i> OFFLINE</a>
                </div>
            </c:if>
            <c:if test="${not empty sessionUser}">
                <div class="pull-left image">
                    <img src="${path}/dist/img/profile/${sessionUser.user_image}" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p>${sessionUser.user_nickname}</p>
                        <%-- Status --%>
                    <a href="#"><i class="fa fa-circle text-success"></i> ONLINE</a>
                </div>
            </c:if>
        </div>

        <%-- search form (Optional) --%>
        <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="게시글 검색">
                <span class="input-group-btn">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
              </button>
            </span>
            </div>
        </form>
        <%-- /.search form --%>

        <%-- Sidebar Menu --%>
        <ul class="sidebar-menu" data-widget="tree">
            <li class="header">메뉴</li>
            <%-- Optionally, you can add icons to the links --%>
            <li class="treeview active">
                <a href="#">
                    <i class="fa fa-clipboard"></i>
                    <span>게시판</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li><a href="../board/list"> <i class="fa-thin fa-user-magnifying-glass"></i><span>전채글보기</span></a></li>
                    <li><a href="../board/list?category_no=1"> <i class="fa-thin fa-user-magnifying-glass"></i><span>자유게시판</span></a></li>
                    <li><a href="../board/list?category_no=2"> <i class="fa-thin fa-user-magnifying-glass"></i><span>사진게시판</span></a></li>
                </ul>
            </li>
        </ul>
        <%-- /.sidebar-menu --%>
    </section>
    <%-- /.sidebar --%>
</aside>
