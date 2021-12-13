package java_folder;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;
import java.sql.*;
import java.util.List;

public class Database {

    private Connection conn;

    public Database() {
        try {
            conn = DriverManager.getConnection("jdbc:sqlite:pimordieDatabase.db");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public List<Note> getNotes() {
        List<Note> notesList = null;
        try {
            PreparedStatement stmntName = conn.prepareStatement("SELECT * FROM notes");
            ResultSet resultSet = stmntName.executeQuery();

            Note[] notesFromResultSet = (Note[]) Utils.readResultSetToObject(resultSet, Note[].class);
            notesList = List.of(notesFromResultSet);


        } catch (SQLException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return notesList;

    }

    public void addNote(Note note) {
        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO notes (title, text ) VALUES(?, ?)");
            stmt.setString(1, note.getTitle());
            stmt.setString(2, note.getText());

            int i = stmt.executeUpdate();
            System.out.println(i + " records updated");

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public void updateNotes(int note_id, String title, String text, long last_updated_datetime) {

        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE notes SET (title = ?, text = ?, last_updated_datetime = ?) WHERE note_id = ?");
            stmt.setString(1, title);
            stmt.setString(2, text);
            stmt.setLong(3, last_updated_datetime);
            stmt.setInt(4, note_id);

            int i = stmt.executeUpdate();
            System.out.println(i + " records updated");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteNote(int note_id) {
        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM notes WHERE note_id = ?");
            stmt.setInt(1, note_id);

            int i = stmt.executeUpdate();
            System.out.println(i + " records updated");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    //TO DO LIST HÄR UNDER

    public List<Todo> getTodolist() {
        List<Todo> todoList = null;
        try {
            PreparedStatement stmntName = conn.prepareStatement("SELECT * FROM todo_list");
            ResultSet resultSet = stmntName.executeQuery();

            Todo[] todoListFromResultSet = (Todo[]) Utils.readResultSetToObject(resultSet, Todo[].class);
            todoList = List.of(todoListFromResultSet);

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return todoList;
    }

    public void addTodo(Todo todo) {
        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO todo_list (text) VALUES(?)");
            stmt.setString(1, todo.getText());

            int i = stmt.executeUpdate();
            System.out.println(i + " todo list item added. Records updated");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteTodo(int todo_id) {
        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM todo_list WHERE todo_id = ?");
            stmt.setInt(1, todo_id);

            int i = stmt.executeUpdate();
            System.out.println(i + " records updated. Removed todo item with ID " + todo_id);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void updateTodo(int todo_id, String text) {
        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE todo_list SET (text = ?) WHERE todo_id = ?");
            stmt.setString(1, text);
            stmt.setInt(2, todo_id);

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void completeTodo(int todo_id, boolean isCompleted) {
        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE todo_list SET isCompleted = true WHERE todo_id = ?");
            stmt.setInt(1, todo_id);

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }
    //ContactMessage
    public void addMessage(ContactMessage message){

        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO contact(fullname, email, message) VALUES(?, ?, ?)");
            stmt.setString(1, message.getFullName());
            stmt.setString(2, message.getEmail());
            stmt.setString(3, message.getMessage());

            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    //create user

    public Boolean createUser(User user){
        Boolean create = false;
        try {

            User userTry = this.getUserByEmail(user.getEmail());
            if(userTry == null){
                create = true;
                PreparedStatement stmt = conn.prepareStatement("INSERT INTO users(email, password) VALUES(?, ?)");
                stmt.setString(1, user.getEmail());
                stmt.setString(2, user.getPassword());

                stmt.executeUpdate();

            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return create;
    }

    //Login
    public Boolean login(User user){
        Boolean login = false;
        User userTry = this.getUserByEmail(user.getEmail());
        if(userTry != null){
            if(userTry.getPassword().equals(user.getPassword())){
                login = true;
            }
        }
        return login;
    }


    public User getUserByEmail(String email){
        User user = null;
        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT*FROM users WHERE email = ?");
            stmt.setString(1, email);

            ResultSet rs = stmt.executeQuery();

            User[] userFromRS = (User[]) Utils.readResultSetToObject(rs, User[].class);

            user = userFromRS[0];

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return user;
    }

}