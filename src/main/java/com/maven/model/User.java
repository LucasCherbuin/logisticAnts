package com.maven.model;

import org.mindrot.jbcrypt.BCrypt;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String pseudo;
    private String email;
    private String password;

    @OneToOne
    @JoinColumn(name = "role_id")
    private Role role;

 

    public User() {
    }

    // Parameterized constructor
    public User(int id, String pseudo, String email, String password, int roleId) {
        this.id = id;
        this.pseudo = pseudo;
        this.email = email;
        setPassword(password); 
        this.role = role;
    }


    public int getId() {
        return id;
    }

    public String getPseudo() {
        return pseudo;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }


    public void setId(int id) {
        this.id = id;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = hashPassword(password);
    }

    public void setRole(Role role) {
        this.role = role;
    }


    private String hashPassword(String plainPassword) {
        if (plainPassword == null) return null;
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt(12));
    }

    public boolean checkPassword(String plainPassword) {
        if (plainPassword == null || this.password == null) return false;
        return BCrypt.checkpw(plainPassword, this.password);
    }
}