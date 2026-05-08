package com.maven.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class database {
    private static final String MYSQL = "MYSQL_DATABASE";
    private static final String USER = "MYSQL_ROOT_USER";
    private static final String PASSWORD = "MYSQL_ROOT_PASSWORD";

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(MYSQL, USER, PASSWORD);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("erreur de connexion", e);
        }
    }
}