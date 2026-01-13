package model;

import jakarta.persistence.*;

@Entity
@Table(name = "role")
<<<<<<< HEAD
public class Role {  
    private int id;
    private String label;
    
    public Role(int id, String label) {  
        this.id = id;
        this.label = label;
    }
    
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
public class Role { 
 private int id;
 private String label;
 
 public Role(int id, String label) { 
 this.id = id;
this.label = label;
}

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
>>>>>>> login
}