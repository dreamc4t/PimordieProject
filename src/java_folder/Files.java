package java_folder;

public class Files {
    private int file_id;
    private long created_datetime;
    private String fileUrl;


    public Files(){}

    public Files(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public int getFile_id() {
        return file_id;
    }

    public long getCreated_datetime() {
        return created_datetime;
    }

    public String getFileUrl() {
        return fileUrl;
    }


    @Override
    public String toString() {
        return "fileItem{" +
                "file_id=" + file_id +
                ", created_datetime=" + created_datetime +
                ", imageUrl='" + fileUrl + '\'' +
                '}';
    }
}
