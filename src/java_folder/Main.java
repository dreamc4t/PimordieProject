package java_folder;

import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        Express appTest = new Express();
        Database db = new Database();

        int port = 3000;
        appTest.listen(port);
        System.out.println("Running on port " + port);


        appTest.get("/", (req, res) -> {
           res.send("HELLO!!");
        });

        appTest.get("/rest/notes", (req, res) -> {
           List<Notes> notes = db.getNotes();
           res.json(notes);
        });


        // DETTA ÄR BARA TEST/SLASK/PISS
        appTest.post("/rest/notes", (req,res) -> {
            db.addNote("Test-titel", "Testanteckningingingignig");

        });

        try {
            appTest.use(Middleware.statics(Paths.get("src/www/").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
