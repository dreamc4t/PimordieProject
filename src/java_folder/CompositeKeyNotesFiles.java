package java_folder;


public class CompositeKeyNotesFiles {
    private int file_id, notes_id;

    public CompositeKeyNotesFiles() {

    }

    public CompositeKeyNotesFiles(int file_id, int notes_id) {
        this.file_id = file_id;
        this.notes_id = notes_id;
    }

    public int getFile_id() {
        return file_id;
    }

    public void setFile_id(int file_id) {
        this.file_id = file_id;
    }

    public int getNotes_id() {
        return notes_id;
    }

    public void setNotes_id(int notes_id) {
        this.notes_id = notes_id;
    }

    @Override
    public String toString() {
        return "CompositeKeyNotesFiles{" +
                "file_id=" + file_id +
                ", notes_id=" + notes_id +
                '}';
    }
}