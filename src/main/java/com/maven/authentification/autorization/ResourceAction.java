package com.maven.authentification.autorization;

import java.security.PrivilegedAction;

public class ResourceAction implements PrivilegedAction<Object> {
    @Override
    public Object run() {
        System.out.println("I have access to test_resource!");
        return null;
    }
}