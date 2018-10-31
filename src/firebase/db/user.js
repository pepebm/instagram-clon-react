import { db } from '../init';

// User API
export const createUserInDatabase = (id, firstname, lastname, username, email) => 
    db.ref(`users/${id}`).set({
        firstname,
        lastname,
        username,
        email
    });

export const getUsers = () => db.ref('users').once('value');

export const addFriend = (id, friendId) => {
    
};