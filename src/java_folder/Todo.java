package java_folder;



public class Todo {
    private int todo_id;
    private String text;
    private boolean isCompeted;

    public Todo() {
    }

    public Todo(String text, boolean isCompeted) {
        this.text = text;
        this.isCompeted = isCompeted;
    }

    public Todo(String text, boolean isCompeted, int note_id) {
        this.text = text;
        this.isCompeted = isCompeted;
        this.todo_id = note_id;

    }

    public int getTodo_id() {
        return todo_id;
    }

    public String getText() {
        return text;
    }

    public boolean isCompeted() {
        return isCompeted;
    }

    public void setTodo_id(int todo_id) {
        this.todo_id = todo_id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setCompeted(boolean competed) {
        isCompeted = competed;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "todo_id=" + todo_id +
                ", text='" + text + '\'' +
                ", isCompeted=" + isCompeted +
                '}';
    }
}
