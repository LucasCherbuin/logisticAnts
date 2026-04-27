package com.maven.authentification;

import java.util.HashMap;
import java.util.Map;

public class UserStore {
    private static final Map<String, String> users = new HashMap<>();

    public static boolean exists(String pseudo) {
        return users.containsKey(pseudo);
    }

    public static void addUser(String pseudo, String hashedPassword) {
        users.put(pseudo, hashedPassword);
    }

    public static String getPassword(String pseudo) {
        return users.get(pseudo);
    }
}