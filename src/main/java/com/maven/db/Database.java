package com.maven.db;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.engine.jdbc.connections.spi.ConnectionProvider;
import org.hibernate.engine.spi.SessionFactoryImplementor;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * Database utility class for Hibernate session management.
 * Reads configuration from hibernate.cfg.xml (must be on the classpath).
 */
public class Database {

    private static final SessionFactory SESSION_FACTORY = buildSessionFactory();

    private Database() {
        // Utility class — no instantiation
    }

    /**
     * Builds the SessionFactory from hibernate.cfg.xml.
     */
    private static SessionFactory buildSessionFactory() {
        try {
            return new Configuration()
                    .configure("hibernate.cfg.xml")   // loads from src/main/resources/
                    .buildSessionFactory();
        } catch (Exception e) {
            System.err.println("SessionFactory creation failed: " + e.getMessage());
            throw new ExceptionInInitializerError(e);
        }
    }

    /**
     * Returns the singleton SessionFactory.
     *
     * @return SessionFactory
     */
    public static SessionFactory getSessionFactory() {
        return SESSION_FACTORY;
    }

    /**
     * Opens and returns a new Hibernate Session.
     * The caller is responsible for closing it.
     *
     * @return Session
     */
    public static Session openSession() {
        return SESSION_FACTORY.openSession();
    }

    /**
     * Returns the current Session bound to the current thread (requires
     * hibernate.current_session_context_class=thread in cfg if used).
     *
     * @return Session
     */
    public static Session getCurrentSession() {
        return SESSION_FACTORY.getCurrentSession();
    }

    /**
     * Returns a raw JDBC Connection from Hibernate's connection pool.
     * The caller is responsible for closing it after use.
     *
     * @return Connection
     * @throws SQLException if a database access error occurs
     */
    public static Connection getConnection() throws SQLException {
        SessionFactoryImplementor sfi = SESSION_FACTORY.unwrap(SessionFactoryImplementor.class);
        return sfi.getServiceRegistry()
                  .getService(ConnectionProvider.class)
                  .getConnection();
    }

    /**
     * Closes the SessionFactory and releases all connections.
     * Call once at application shutdown.
     */
    public static void shutdown() {
        if (SESSION_FACTORY != null && !SESSION_FACTORY.isClosed()) {
            SESSION_FACTORY.close();
            System.out.println("SessionFactory closed.");
        }
    }

    // -------------------------------------------------------------------------
    // Convenience helpers
    // -------------------------------------------------------------------------

    /**
     * Persists a new entity inside its own transaction.
     *
     * @param entity the object to save
     */
    public static void save(Object entity) {
        try (Session session = openSession()) {
            session.beginTransaction();
            session.persist(entity);
            session.getTransaction().commit();
        } catch (Exception e) {
            throw new RuntimeException("Error saving entity: " + e.getMessage(), e);
        }
    }

    /**
     * Merges (updates) an existing entity inside its own transaction.
     *
     * @param entity the object to update
     */
    public static void update(Object entity) {
        try (Session session = openSession()) {
            session.beginTransaction();
            session.merge(entity);
            session.getTransaction().commit();
        } catch (Exception e) {
            throw new RuntimeException("Error updating entity: " + e.getMessage(), e);
        }
    }

    /**
     * Deletes an entity inside its own transaction.
     *
     * @param entity the object to delete
     */
    public static void delete(Object entity) {
        try (Session session = openSession()) {
            session.beginTransaction();
            session.remove(session.contains(entity) ? entity : session.merge(entity));
            session.getTransaction().commit();
        } catch (Exception e) {
            throw new RuntimeException("Error deleting entity: " + e.getMessage(), e);
        }
    }

    /**
     * Finds an entity by its primary key.
     *
     * @param clazz the entity class
     * @param id    the primary key value
     * @param <T>   entity type
     * @return the entity or null if not found
     */
    public static <T> T findById(Class<T> clazz, Object id) {
        try (Session session = openSession()) {
            return session.get(clazz, id);
        } catch (Exception e) {
            throw new RuntimeException("Error finding entity by id: " + e.getMessage(), e);
        }
    }
}