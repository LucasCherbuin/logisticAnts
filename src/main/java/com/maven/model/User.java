package com.maven.model;

<<<<<<< HEAD
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
    private int roleId;

 

    public User() {
    }

    // Parameterized constructor
=======
import at.favre.lib.crypto.bcrypt.BCrypt;
import jakarta.persistence.OneToOne;
import jakarta.persistence.*;


@Entity
@Table(name = "user")

public class User {
    private int id;
    private String pseudo;
    private String email;
    private String password;
    @OneToOne
    private int roleId;
    
>>>>>>> PageVisiteur
    public User(int id, String pseudo, String email, String password, int roleId) {
        this.id = id;
        this.pseudo = pseudo;
        this.email = email;
<<<<<<< HEAD
        setPassword(password); 
        this.roleId = roleId;
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

    public int getRole() {
        return roleId;
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

    public void setRole(int roleId) {
        this.roleId = roleId;
    }


    private String hashPassword(String plainPassword) {
        if (plainPassword == null) return null;
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt(12));
    }

    public boolean checkPassword(String plainPassword) {
        if (plainPassword == null || this.password == null) return false;
        return BCrypt.checkpw(plainPassword, this.password);
=======
        setPassword(password);
        this.roleId = roleId;
    }
    
    // Getters
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
    
    public int getRole() {
        return roleId;
    }
    
    // Setters
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
    this.password = BCrypt.withDefaults().hashToString(12, password.toCharArray());
    }

    
    public void setRole(int roleId) {
        this.roleId = roleId;
    }
    
    public boolean checkPassword(String password) {
        BCrypt.Result result = BCrypt.verifyer().verify(password.toCharArray(), this.password);
        return result.verified;
>>>>>>> PageVisiteur
    }
}