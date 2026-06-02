package com.maven.seeder;

import com.maven.model.Commande;
import com.maven.repository.CommandeRepository;
import org.springframework.stereotype.Component;

@Component
public class CommandeSeeder {
    private final CommandeRepository commandeRepository;

    public CommandeSeeder(CommandeRepository commandeRepository) {
        this.commandeRepository = commandeRepository;
    }

    public void seedCommandes() {
        if (commandeRepository.count() == 0) {
            Commande commande = new Commande();
            commande.setPayement("non payé");
            commande.setFacture(null);
            commande.setUser(null);
            commande.setArticleCommandes(null);
            commandeRepository.save(commande);
            System.out.println("Commandes seedées !");
        } else {
            System.out.println("Commandes déjà présentes, skip");
        }
    }
}