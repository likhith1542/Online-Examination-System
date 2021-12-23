import axios from "axios";

class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  upload() {
    return this.loader.file.then((uploadedFile) => {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append("files", uploadedFile);

        axios({
          url: "http://192.168.29.67:5000/api/questions/upload/questionimage",
          method: "post",
          data,
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          withCredentials: false,
        })
          .then((response) => {
            if (response.data.url) {
              resolve({
                default: response.data.url[0],
              });
            } else {
              reject(response.data.message);
            }
          })
          .catch((response) => {
            reject("Upload failed");
          });
      });
    });
  }
}

export default UploadAdapter;
