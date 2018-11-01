import { db, storage } from '../init';

// Post CRUD
export const createPost = (id, title, image) => {
    const date = Date.now();
    const imageName = `${date}-${image.name}`;
    const postName = `${id}-${date}`;
    const metadata = {
        contentType: image.type
    };
    const uploadTask = storage.child(imageName).put(image, metadata);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            snapshot => console.log('Upload is ' + (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + '% done'),
            err => reject(err.message),
            () => {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then((url) => {
                        db.ref('posts/' + postName).set({
                            userId: id,
                            title: title,
                            image: url,
                            createdAt: date
                        });
                    })
                    .then(resolve('OK'))
                    .catch((err) => reject(err.message));
            });
    });
};

export const getPosts = (id) => {
    let result = [];
    let friends = [];
    return new Promise((resolve, reject) => {
        db.ref(`users/${id}/friends`).on('value', 
                f => {
                    friends.concat(f);
                    return db.ref('posts').orderByChild('date').once('value');
                },
                err => reject(err))
            .then(posts => {
                debugger;
                result.concat(posts.filter(p => friends.includes(p.userId)));
                resolve(result);
            })
            .catch(err => reject(err));
    });
};