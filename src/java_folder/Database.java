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

            int i=stmt.executeUpdate();
            System.out.println(i+" records updated");

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public void updateNotes(int note_id, String title, String text, long last_updated_datetime)  {

        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE notes SET (title = ?, text = ?, last_updated_datetime = ?) WHERE note_id = ?");
            stmt.setString(1, title);
            stmt.setString(2, text);
            stmt.setLong(3, last_updated_datetime);
            stmt.setInt(4, note_id);

            int i=stmt.executeUpdate();
            System.out.println(i+" records updated");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteNote(int note_id){
        try {
            PreparedStatement stmt =conn.prepareStatement("DELETE FROM notes WHERE note_id = ?");
            stmt.setInt(1,note_id);

            int i=stmt.executeUpdate();
            System.out.println(i+" records updated");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
