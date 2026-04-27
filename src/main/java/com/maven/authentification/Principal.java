package com.maven.authentification;

import java.io.Serializable;

public class Principal implements java.security.Principal, Serializable {
    private static final long serialVersionUID = 1L;
    private final String name;

    public Principal(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof java.security.Principal that)) return false;
        return this.getName().equals(that.getName());
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }
}