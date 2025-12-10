public class commande {
    private int id;
    private articleCommande articleCommande;
    
    public commande(int id, articleCommande articleCommande) {
        this.id = id;
        this.articleCommande = articleCommande;
    }

    //getters
    public int getId() {
        return id;
    }
    public articleCommande getArticleCommande() {
        return articleCommande;
    }
}
