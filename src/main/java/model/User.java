package model;

import org.mindrot.jbcrypt.BCrypt;

public class User {
    private int id;
    private String pseudo;
    private String email;
    private String password;
    private int roleId;
    
    public User(int id, String pseudo, String email, String password, int roleId) {
        this.id = id;
        this.pseudo = pseudo;
        this.email = email;
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
        this.password = hashPassword(password);
    }
    
    public void setRole(int roleId) {
        this.roleId = roleId;
    }
    
    private String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt(12));
    }
    
    public boolean checkPassword(String plainPassword) {
        return BCrypt.checkpw(plainPassword, this.password);
    }
}