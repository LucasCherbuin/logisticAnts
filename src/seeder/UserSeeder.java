import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UserSeeder {

    public static void seedUsers() {

        String insertUserSQL = "INSERT INTO users (pseudo, email, password, role_id) VALUES (?, ?, ?, ?)";

        try (Connection connection = Database.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(insertUserSQL)) {

            // Liste des utilisateurs à insérer
            Object[][] users = {
                {"admin", "admin@mail.com", "admin123", 1},
                {"logisticien", "log@mail.com", "log123", 2},
                {"secretaire", "sec@mail.com", "sec123", 3},
                {"client", "client@mail.com", "client123", 4}
            };

            for (Object[] user : users) {
                preparedStatement.setString(1, (String) user[0]); // pseudo
                preparedStatement.setString(2, (String) user[1]); // email
                preparedStatement.setString(3, (String) user[2]); // password
                preparedStatement.setInt(4, (Integer) user[3]);   // role_id

                preparedStatement.executeUpdate();
            }

            System.out.println("Users seeded successfully!");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
