public class articleCommande {
    private int id;
    private produit produit;
    private int quantite;

    public articleCommande(int id, produit produit, int quantite) {
        this.id = id;
        this.produit = produit;
        this.quantite = quantite;
    }

    //getters
    public int getId() {
        return id;
    }
    public produit getProduit() {
        return produit;
    }
    public int getQuantite() {
        return quantite;
    }
}
