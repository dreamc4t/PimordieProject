package java_folder;

public class User {

    private int user_id;
    private String email;
    private String password;
    private long created_date_time;

    public User() {
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User(int user_id, String email, String password, long created_date_time) {
        this.user_id = user_id;
        this.email = email;
        this.password = password;
        this.created_date_time = created_date_time;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public long getCreated_date_time() {
        return created_date_time;
    }

    public void setCreated_date_time(long created_date_time) {
        this.created_date_time = created_date_time;
    }

    @Override
    public String toString() {
        return "User{" +
                "user_id=" + user_id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", created_date_time=" + created_date_time +
                '}';
    }
}

