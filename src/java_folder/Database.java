package java_folder;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;

import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.sql.*;
import java.time.Instant;
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
            System.out.println(i + " Records updated");

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public void updateNotes(Note note,int note_id) {

        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE notes SET title = ?, text = ?, last_updated_datetime = ? WHERE note_id = ?");
            stmt.setString(1, note.getTitle());
            stmt.setString(2, note.getText());
            stmt.setLong(3, unixTimestamp());
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


    //TO DO LIST H??R UNDER

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

    public Todo getTodoListById(int id) {


        Todo todo = null;
        PreparedStatement statement = null;

        try {
            statement = conn.prepareStatement("SELECT * FROM todo_list WHERE todo_id = ?");
            statement.setInt(1, id);//ej 0-index

            ResultSet rs = statement.executeQuery(); //detta ??r en lista, vi vill dock ha en todo och ej en hel lista

            Todo[] todosFromRs = (Todo[]) Utils.readResultSetToObject(rs, Todo[].class); //skapa tempor??r array

            todo = todosFromRs[0]; //tar f??rsta ur arrayen!
            System.out.println("Getting todo with text: " + todo.getText() + " (id = " + id + ")");


        } catch (SQLException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return todo;
    }

    public void addTodo(Todo todo) {
        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO todo_list (text, isCompleted ) VALUES(?, ?)");
            stmt.setString(1, todo.getText());
            stmt.setBoolean(2,todo.isCompleted());

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

    public void updateTodo(int todo_id, Todo todo) {
        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE todo_list SET text = ? WHERE todo_id = ?");
            stmt.setString(1, todo.getText());
            stmt.setInt(2, todo_id);

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public void completeTodo(int todo_id, boolean isCompleted) {
        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE todo_list SET isCompleted = " + isCompleted + " WHERE todo_id = ?");
            stmt.setInt(1, todo_id);

            int i = stmt.executeUpdate();
            System.out.println(i + " records updated. Set todo item with ID " + todo_id + "'s completed status to " + isCompleted);

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    //ContactMessage
    public void addMessage(ContactMessage message){

        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO contact_message(fullname, email, message) VALUES(?, ?, ?)");
            stmt.setString(1, message.getFullName());
            stmt.setString(2, message.getEmail());
            stmt.setString(3, message.getMessage());

            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    //create user

    public ResponseLogin createUser(User user) {
        ResponseLogin create = new ResponseLogin();
        User userTry = this.getUserByEmail(user.getEmail());
        try {
            if(userTry == null){
                PreparedStatement stmt = conn.prepareStatement("INSERT INTO user (email, password) VALUES(?, ?)");
                stmt.setString(1, user.getEmail());
                stmt.setString(2, user.getPassword());

                stmt.executeUpdate();

                create.setLogin(true);
            }
            else{
                create.setLogin(false);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return create;
    }

    //Login
    public ResponseLogin login(User user){
        ResponseLogin loginAttempt = new ResponseLogin();
        User matchingUserFromDb = this.getUserByEmail(user.getEmail());
        if(matchingUserFromDb != null){
            if(matchingUserFromDb.getPassword().equals(user.getPassword())) {
                loginAttempt.setLogin(true); //if there is a user with matching email and password set login.login to true
            }
        }
        return loginAttempt;
    }


    public User getUserByEmail(String email){
        User user = null;
        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM user WHERE email = ?");
            stmt.setString(1, email);

            ResultSet rs = stmt.executeQuery();
            if(rs.isBeforeFirst()) {//Checks that Resultset is not empty
                User[] userFromRS = (User[]) Utils.readResultSetToObject(rs, User[].class);
                user = userFromRS[0];
            }

        } catch (SQLException | JsonProcessingException e) {
            e.printStackTrace();
        }

        return user;
    }

//******************************** Composite key *********************************

    public void createCompositeKey(int file_id, int note_id) {
        try {

            PreparedStatement stmt = conn.prepareStatement("INSERT INTO file_composite (file_id, notes_id) VALUES(?, ?)");
            stmt.setInt(1, file_id);
            stmt.setInt(2,note_id);

            stmt.executeUpdate();

            stmt.executeQuery();
            System.out.println("Created a composite key with file_id " + file_id + " and notes_id " + note_id);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public List<CompositeKeyNotesFiles> getCompositeKeys() {
        List<CompositeKeyNotesFiles> compositeKeys = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM file_composite");
            ResultSet rs = stmt.executeQuery();

            CompositeKeyNotesFiles[] usersFromRS = (CompositeKeyNotesFiles[]) Utils.readResultSetToObject(rs, CompositeKeyNotesFiles[].class);
            compositeKeys = List.of(usersFromRS);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return compositeKeys;
    }
//************************ File upload ************************


    public String uploadFile(FileItem file) {

        String fileUrl = "/uploads/" + file.getName();

        try (var os = new FileOutputStream(Paths.get("src/www" + fileUrl).toString())) {

            os.write(file.get());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return fileUrl;
    }

    public void createFile(Files file) {
        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO file (fileUrl,note_id) VALUES(?,?)");
            stmt.setString(1, file.getFileUrl());
            stmt.setInt(2, file.getNote_id());
            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public List<Files> getFiles() {
        List<Files> files = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM file");
            ResultSet rs = stmt.executeQuery();

            Files[] usersFromRS = (Files[]) Utils.readResultSetToObject(rs, Files[].class);
            files = List.of(usersFromRS);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return files;
    }

    public void deleteFile(int file_id) {
        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM file WHERE file_id = ?");
            stmt.setInt(1, file_id);

            int i = stmt.executeUpdate();
            System.out.println(i + " records updated. Removed file with ID " + file_id);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    private long unixTimestamp(){
        long unixtime = Instant.now().getEpochSecond();
        System.out.println("the unixTime = "+ unixtime);
        return unixtime;
    };


}