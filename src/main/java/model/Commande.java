package model;

public class Commande {
    private int id;
    private int articleCommandeId;
    
    public Commande(int id, int articleCommandeId) {
        this.id = id;
        this.articleCommandeId = articleCommandeId;
    }

    //getters
    public int getId() {
        return id;
    }
    public int getArticleCommandeId() {
        return articleCommandeId;
    }
}
