import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class RoleSeerder {

    public static void seedRoles() {
        String insertRoleSQL = "INSERT INTO roles (name) VALUES (?)";
        
        try (Connection connection = database.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(insertRoleSQL)) {
             
            
            String[] roles = {"ADMIN", "LOGISTICIEN", "SECRETAIRE", "CLIENT"};
            
            for (String role : roles) {
                preparedStatement.setString(0, role);
                preparedStatement.executeUpdate();
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }   
    }
}   

