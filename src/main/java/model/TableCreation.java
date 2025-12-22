package model;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class TableCreation {

    public static void main(String[] args) {
        SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
        System.out.println("Tables générées dans la DB");
        sessionFactory.close();
    }
}
