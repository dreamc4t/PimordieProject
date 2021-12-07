package java_folder;


import java.time.Instant;

public class Notes {
    private int note_id;
    private String title, text;
    private long last_updated_datetime;
    private long created_datetime;


    //Instant instant = Instant.ofEpochSecond(unixTime);


    public Notes() {
    }

    public Notes(String title, String text) {
        this.title = title;
        this.text = text;
    }

    public Notes(String title, String text, int note_id) {
        this.title = title;
        this.text = text;
        this.note_id = note_id;
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

    public int getNote_id() {
        return note_id;
    }

    public void setNote_id(int note_id) {
        this.note_id = note_id;
    }




}
