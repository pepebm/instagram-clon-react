import { db } from '../init';

const convertToB64 = (file) => new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = err => reject(err);
    fileReader.readAsDataURL(file);
});

// Post CRUD
export const createPost = (id, title, image) => {
    const date = Date.now();
    const postName = `${id}-${date}`;
    return new Promise((resolve, reject)=>{
        convertToB64(image)
            .then(data =>
                db.ref('posts/' + postName).set({
                    userId: id,
                    title: title,
                    image: data,
                    createdAt: date
                })
            )
            .then(snapshot => resolve(snapshot.val()))
            .catch(err => reject(err));
    })
    
};