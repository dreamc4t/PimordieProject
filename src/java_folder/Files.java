package java_folder;

public class Files {
    private int file_id, note_id;
    private long created_datetime;
    private String fileUrl;


    public int getFile_id() {
        return file_id;
    }

    public void setFile_id(int file_id) {
        this.file_id = file_id;
    }

    public int getNote_id() {
        return note_id;
    }

    public void setNote_id(int note_id) {
        this.note_id = note_id;
    }

    public long getCreated_datetime() {
        return created_datetime;
    }

    public void setCreated_datetime(long created_datetime) {
        this.created_datetime = created_datetime;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    @Override
    public String toString() {
        return "Files{" +
                "file_id=" + file_id +
                ", note_id=" + note_id +
                ", created_datetime=" + created_datetime +
                ", fileUrl='" + fileUrl + '\'' +
                '}';
    }
}