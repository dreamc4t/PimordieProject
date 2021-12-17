package java_folder;

public class ResponseLogin {

    private boolean login = false;

    public boolean getLogin() {
        return login;
    }

    public void setLogin(boolean login) {
        this.login = login;
    }

    @Override
    public String toString() {
        return "ResponseLogin{" +
                "login=" + login +
                '}';
    }
}
