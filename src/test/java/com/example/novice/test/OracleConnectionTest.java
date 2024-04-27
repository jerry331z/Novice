/*
 ┌───────────────────────────────────────────────────────────────────┐
 │ Copyright (c) 2023년 6월 29일 JerryDEV All rights reserved.        │
 └───────────────────────────────────────────────────────────────────┘
 */

/*
작성자 : Min Woo Song
작성일 : 2023-06-29
작성시간 : PM 4:42
작성용도 : 
*/

package com.example.novice.test;

import org.junit.Test;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.sql.*;

public class OracleConnectionTest {
    static {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testConnection() {

        try (Connection con =
                     DriverManager.getConnection(
                             // Oracle19 버전인 경우 => "jdbc:oracle:thin:@localhost:1521:orcl"
                             // Oracle11 버전인 경우 => "jdbc:oracle:thin:@localhost:1521:XE"
                             "jdbc:oracle:thin:@localhost:1521:XE",
                             "scott",
                             "students")) {
            System.out.println(con);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
