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

        int port = 3000;
        app.listen(port);
        System.out.println("Running on port " + port);

        try {
            app.use(Middleware.statics(Paths.get("src/www/").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.get("/hello-world", (req, res) -> {
            res.send("HELLO,we are pimordie");
        });

        //Här är req/res för notes
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
            res.send("Post OK!");
            db.addTodo(todo);
        });

        app.delete("/rest/todo-list/:todo_id", (req,res) -> {
            int todo_id =  Integer.parseInt(req.getParam("todo_id"));
            res.send("DELETED");
            db.deleteTodo(todo_id);
        });

    }
}
