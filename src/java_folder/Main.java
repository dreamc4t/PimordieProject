package java_folder;

import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        Express app = new Express();
        Database db = new Database();



        app.get("/hello-world", (req, res) -> {
           res.send("HELLO,we are pimordie");

        });

        app.get("/rest/notes", (req, res) -> {
           List<Note> notes = db.getNotes();

           res.json(notes);
        });

        app.post("/rest/notes", (req,res) -> {
            Note note = (Note) req.getBody(Note.class);

            System.out.println(note.toString());

            res.send("Post OK!");

            db.addNote(note);
        });

        app.delete("/rest/notes/:id", (req,res) -> {

            int note_id =  Integer.parseInt(req.getParam("id"));

            res.send("DELETED");

            db.deleteNote(note_id);

        });

        try {
            app.use(Middleware.statics(Paths.get("src/www/").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(3000);
        System.out.println("Running on port 3000");
    }
}
