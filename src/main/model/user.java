public class user {
    private int id;
    private String pseudo;
    private String email;
    private String password;
    private Role role;

    public user(int id, String pseudo, String email, String password) {
        this.id = id;
        this.pseudo = pseudo;
        this.email = email;
        this.password = password;
        this.role = Role;
    }

    //getters
    public int getId() {
        return id;
    }
    public String getPseudo() {
        return pseudo;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
    public Role getRole() {
        return role;
    }


}


