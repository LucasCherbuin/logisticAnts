package com.maven.authentification;

public class LoginResponse {
    public String token;
    public String pseudo;

    public LoginResponse(String token, String pseudo) {
        this.token = token;
        this.pseudo = pseudo;
    }
}