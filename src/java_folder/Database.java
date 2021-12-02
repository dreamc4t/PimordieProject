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


    public List<Notes> getNotes() {
        List<Notes> notesList = null;
        try {
            PreparedStatement stmntName = conn.prepareStatement("SELECT * FROM notes");
            ResultSet resultSet = stmntName.executeQuery();


            Notes[] notesFromResultSet = (Notes[]) Utils.readResultSetToObject(resultSet, Notes[].class);
            notesList = List.of(notesFromResultSet);


        } catch (SQLException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return notesList;

    }

    public void addNote(String title, String text) { //denna är najs om vi kan nå genom någon input alltså
        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO notes (title, text) VALUES(?, ?)");
            stmt.setString(1, title);
            stmt.setString(2, text);

            stmt.executeUpdate(); //Update och inte Query


        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

}
