package model;

import jakarta.persistence.*;

@Entity
@Table(name = "image")

public class Image {
    private int id;
    private String url;

    public Image(int id, String url) {
        this.id = id;
        this.url = url;
    }

    //getters
    public int getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }
    
}
