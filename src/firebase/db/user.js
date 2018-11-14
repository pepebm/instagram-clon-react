import { db } from '../init';

// User API
export const createUserInDatabase = (id, firstname, lastname, username, email, description, profilePicture) => 
    db.ref(`users/${id}`).set({
        id,
        firstname,
        lastname,
        username,
        email,
        description,
        profilePicture
    });

export const editUserInDatabase = (id, firstname, lastname, username, description, profilePicture) =>
    db.ref(`users/${id}`).set({
        firstname,
        lastname,
        username,
        description,
        profilePicture
    });

export const getUsers = () => db.ref('users').once('value');

export const addFriend = (id, friendId) =>
    db.ref(`users/${id}/friends`).push({
        userId: friendId
    });

