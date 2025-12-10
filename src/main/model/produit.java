import java.sql.Date;

public class produit {
    private int id;
    private String nom;
    private int prix;
    private int quantiteStock;
    private date derniereAjout;
    private boolean perissable;
    private Date datePeremption;
    private fournisseur fournisseur;
    private image image;

    public produit(int id, String nom, int prix, int quantiteStock, date derniereAjout, boolean perissable, Date datePeremption, fournisseur fournisseur, image image) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.quantiteStock = quantiteStock;
        this.derniereAjout = derniereAjout;
        this.perissable = perissable;
        this.datePeremption = datePeremption;
        this.fournisseur = fournisseur;
        this.image = image;
    }

    //getters
    public int getId() {
        return id;
    }   
    public String getNom() {
        return nom;
    }
    public int getPrix() {
        return prix;
    }
    public int getQuantiteStock() {
        return quantiteStock;
    }
    public date getDerniereAjout() {
        return derniereAjout;
    }
    public boolean isPerissable() {
        return perissable;
    }
    public Date getDatePeremption() {
        return datePeremption;
    }
    public fournisseur getFournisseur() {
        return fournisseur;
    }
    public image getImage() {
        return image;
    }
}
