import axios from 'axios';
import {Config} from "./config";
//FileHandler

export class FileHandler {




    static uploadFile(file, token) {
        return new Promise(async (resolve, reject) => {
            try {
                let formData = new FormData();
                formData.append('sloc_file', file);
                const result = await axios.post("https://sloc-app.herokuapp.com/api/sloc/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const data = result.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

}
