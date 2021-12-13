package java_folder;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;
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
            System.out.println("the unixTime = "+ unixTimestamp());
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

    public Todo getTodoListById(int id) {


        Todo todo = null;
        PreparedStatement statement = null;

        try {
            statement = conn.prepareStatement("SELECT * FROM todo_list WHERE todo_id = ?");
            statement.setInt(1, id);//ej 0-index

            ResultSet rs = statement.executeQuery(); //detta är en lista, vi vill dock ha en todo och ej en hel lista

            Todo[] todosFromRs = (Todo[]) Utils.readResultSetToObject(rs, Todo[].class); //skapa temporär array

            todo = todosFromRs[0]; //tar första ur arrayen!
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



            PreparedStatement stmt = conn.prepareStatement("UPDATE todo_list SET isCompleted = " + isCompleted + " WHERE todo_id = ?");
            stmt.setInt(1, todo_id);

            int i = stmt.executeUpdate();
            System.out.println(i + " records updated. Set todo item with ID " + todo_id + "'s completed status to " + isCompleted);

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    private long unixTimestamp(){
        long unixtime = Instant.now().getEpochSecond();

        return unixtime;
    };
}