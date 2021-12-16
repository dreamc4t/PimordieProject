package java_folder;

import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import org.apache.commons.fileupload.FileItem;

public class Main {
    public static void main(String[] args) {

        Express app = new Express();
        Database db = new Database();


        try {
            app.use(Middleware.statics(Paths.get("src/www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.get("/hello-world", (req, res) -> {
            res.send("HELLO,we are pimordie");
        });

        //Här är req/res för "notes"
        // Hämta alla "notes"
        app.get("/rest/notes", (req, res) -> {
           List<Note> notes = db.getNotes();
           res.json(notes);
        });
        // Skapa en ny "note"
        app.post("/rest/notes", (req,res) -> {
            Note note = (Note) req.getBody(Note.class);
            System.out.println(note.toString());
            res.send("Post OK!");
            db.addNote(note);

        });
        //uppdatera notes
        app.put("/rest/notes/:note_id", (req,res) -> {
            int note_id =  Integer.parseInt(req.getParam("note_id"));

            Note note = (Note) req.getBody(Note.class);

            System.out.println(note.toString());
            res.send("Updated");

            db.updateNotes(note,note_id);
        });

        // Tabort en "note"
        app.delete("/rest/notes/:note_id", (req,res) -> {
            int note_id =  Integer.parseInt(req.getParam("note_id"));
            res.send("DELETED");
            db.deleteNote(note_id);
        });



        //Här är req/res för todo-list
        app.get("/rest/todo-list", (req, res) -> {
            List<Todo> todos = db.getTodolist();
            res.json(todos);
        });

        app.post("/rest/todo-list", (req,res) -> {
            Todo todo = (Todo) req.getBody(Todo.class);
            System.out.println(todo.toString());
            db.addTodo(todo);
            res.send("Post OK!");
        });

        app.delete("/rest/todo-list/:todo_id", (req,res) -> {
            int todo_id =  Integer.parseInt(req.getParam("todo_id"));

            db.deleteTodo(todo_id);

            res.send("DELETED");
        });

        // req/res Login
        app.post("/rest/user", (req, res) -> {

            User user = (User) req.getBody(User.class);

            res.json(db.login(user));
            res.send("OK");
        });

        // res/req signup
        app.post("/rest/signup", (req, res) -> {

            User user = (User) req.getBody(User.class);

            res.json(db.createUser(user));
            res.send("OK");
        });

        // req/res contact
        app.post("/rest/contact", (req, res) -> {
            ContactMessage message = (ContactMessage) req.getBody(ContactMessage.class);

        db.addMessage(message);

            res.send("OK");
        });

        //Sätta todo item som completed
        app.put("/rest/todo-list/:todo_id", (req,res) -> {
            int todo_id =  Integer.parseInt(req.getParam("todo_id"));
            Todo todo = db.getTodoListById(todo_id);


            if (todo.isCompleted() == true) {
                System.out.println(todo.getTodo_id() + " is now set to 'not completed' aka false");
                db.completeTodo(todo_id, false);
            }
            else {
                System.out.println(todo.getTodo_id() + " is now set to 'completed' aka true");
                db.completeTodo(todo_id, true);
            }

            res.send("Updated");
        });

        //Här är req/res för file upload
        app.post("/api/file-upload", (req, res) -> {
            String fileUrl = null;

            // extract the file from the FormData
            try {
                List<FileItem> files = req.getFormData("files");
                fileUrl = db.uploadFile(files.get(0));
            } catch (Exception e) {
                e.printStackTrace();
                res.send("error");
            }

            res.send(fileUrl);

        });

        app.post("/rest/files", (req, res) -> {
            Files file = (Files) req.getBody(Files.class);

            db.createFile(file);
            res.send("post OK");
        });

        app.get("/rest/files", (req, res) -> {
            List<Files> files = db.getFiles();
            res.json(files);
        });

        app.delete("/rest/files/:file_id", (req,res) -> {
            int file_id =  Integer.parseInt(req.getParam("file_id"));
            res.send("DELETED");
            db.deleteFile(file_id);
        });

        app.get("/rest/composite", (req, res) -> {
            List<CompositeKeyNotesFiles> compKeys = db.getCompositeKeys();
            res.json(compKeys);
        });

        int port = 3000;

        app.listen(port);
        System.out.println("Running on port " + port);

    }

}
