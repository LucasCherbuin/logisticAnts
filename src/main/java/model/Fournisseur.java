package model;

public class Fournisseur {
    private int id;
    private String nom;
    private String adresse;
    private String email;

    public Fournisseur(int id, String nom, String adresse, String email) {
        this.id = id;
        this.nom = nom;
        this.adresse = adresse;
        this.email = email;
    }

    //getters
    public int getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getAdresse() {
        return adresse;
    }

    public String getEmail() {
        return email;
    }
}
