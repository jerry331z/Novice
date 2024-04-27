/*
 ┌───────────────────────────────────────────────────────────────────┐
 │ Copyright (c) 2023년 6월 29일 JerryDEV All rights reserved.        │
 └───────────────────────────────────────────────────────────────────┘
 */

/*
작성자 : Min Woo Song
작성일 : 2023-06-29
작성시간 : PM 5:28
작성용도 : 
*/

package com.example.novice.test;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:src/main/resources/spring/context-datasource.xml"})
public class MyBatisTest {

    @Autowired
    SqlSessionFactory sqlSessionFactory;

    @Test
    public void testFactory() {
        System.out.println(sqlSessionFactory);
    }

    @Test
    public void testSession() {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            System.out.println(session);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
