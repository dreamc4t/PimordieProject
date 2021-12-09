package java_folder;


//import java.time.Instant;

public class Note {
    private int note_id;
    private String title, text;
    private long last_updated_datetime;
    private long created_datetime;


    //Instant instant = Instant.ofEpochSecond(unixTime);


    public Note() {
    }

    public Note(String title, String text) {
        this.title = title;
        this.text = text;
    }


    public int getNote_id() {
        return note_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public long getLast_updated_datetime() {
        return last_updated_datetime;
    }

    public long getCreated_datetime() {
        return created_datetime;
    }

    @Override
    public String toString() {
        return "Notes{" +
                "note_id=" + note_id +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", last_updated_datetime=" + last_updated_datetime +
                ", created_datetime=" + created_datetime +
                '}';
    }
}
