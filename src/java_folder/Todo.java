package java_folder;

public class Todo {
    private int todo_id;
    private String text;
    private boolean isCompleted;

    public Todo() {
    }

    public Todo(String text) {
        this.text = text;
    }

    public Todo(String text, boolean isCompleted) {
        this.text = text;
        this.isCompleted = isCompleted;
    }

    public Todo(String text, boolean isCompleted, int note_id) {
        this.text = text;
        this.isCompleted = isCompleted;
        this.todo_id = note_id;

    }

    public int getTodo_id() {
        return todo_id;
    }

    public void setTodo_id(int todo_id) {
        this.todo_id = todo_id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }


    /* Gammal kod
    public int getTodo_id() {
        return todo_id;
    }

    public String getText() {
        return text;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setTodo_id(int todo_id) {
        this.todo_id = todo_id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setIsCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

     */

    @Override
    public String toString() {
        return "Todo{" +
                "todo_id=" + todo_id +
                ", text='" + text + '\'' +
                ", isCompleted=" + isCompleted +
                '}';
    }
}
