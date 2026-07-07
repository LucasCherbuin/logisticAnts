package com.maven.seeder;

import com.maven.model.Commande;
import com.maven.model.User;
import com.maven.repository.UserRepository;
import com.maven.repository.CommandeRepository;

import org.springframework.boot.autoconfigure.integration.IntegrationProperties.RSocket.Client;
import org.springframework.stereotype.Component;

@Component
public class CommandeSeeder {
    private final CommandeRepository commandeRepository;
    private final UserRepository userRepository;

    public CommandeSeeder(CommandeRepository commandeRepository, UserRepository userRepository) {
        this.commandeRepository = commandeRepository;
        this.userRepository = userRepository;
    }

    public void seedCommandes() {
        if (commandeRepository.count() == 0) {
            User client = userRepository.findByPseudo("client").orElse(null);
            Commande commande = new Commande();
            commande.setPayement("Mastercard");
            commande.setFacture(null);
            commande.setUser(client);
            commande.setArticleCommandes(null);
            commandeRepository.save(commande);
            System.out.println("Commandes seedées !");
        } else {
            System.out.println("Commandes déjà présentes, skip");
        }
    }
}