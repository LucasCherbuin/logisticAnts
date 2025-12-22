import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class database {
    private static final String URL = "URL_DATABASE";
    private static final String USER = "USER_DATABASE";
    private static final String PASSWORD = "PASSWORD_DATABASE";

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("erreur de connexion", e);
        }
    }
}
