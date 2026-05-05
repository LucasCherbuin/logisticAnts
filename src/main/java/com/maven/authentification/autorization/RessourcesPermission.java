package com.maven.authentification.autorization;

import java.security.BasicPermission;

public class RessourcesPermission extends BasicPermission {
    public RessourcesPermission(String role) {
        super(role);
    }
}