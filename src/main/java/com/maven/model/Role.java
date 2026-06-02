package com.maven.model;

import jakarta.persistence.*;

@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String label;

    public Role() {}

    public Role(String label) { this.label = label; }

    public int getId() { return id; }
    public String getLabel() { return label; }

    public void setId(int id) { this.id = id; }
    public void setLabel(String label) { this.label = label; }
}