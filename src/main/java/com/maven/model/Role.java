package com.maven.model;

import jakarta.persistence.*;

@Entity
@Table(name = "role")

public class Role { 
    private int id;
    private String label;
    
    public Role(int id, String label) { 
    this.id = id;
    this.label = label;
}

<<<<<<< HEAD
 // Getters
public int getId() {
return id;
}

public String getLabel() {
return label;
 }

 // Setters
public void setId(int id) {
this.id = id;
 }

 public void setLabel(String label) {
 this.label = label;
}
=======
    public Role() {}

    public Role(String label) { this.label = label; }

    public int getId() { return id; }
    public String getLabel() { return label; }

    public void setId(int id) { this.id = id; }
    public void setLabel(String label) { this.label = label; }
>>>>>>> 5a82615 (correction back end)
}