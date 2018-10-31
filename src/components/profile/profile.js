import React, { Component } from 'react';
import './profile.css';
import AuthUserContext from '../AuthUserContext';
import withAuthorization from '../withAuthorization';


const authCondition = (authUser) => !!authUser;
class Profile extends Component {
    render(){
        return(
            <AuthUserContext.Consumer>
                {
                    authUser => 
                        <div>
                            <ul>
                                <li>Account: {authUser.email}</li>
                                <li>ID: {authUser.UID}</li>
                            </ul>
                        </div>
                }
            </AuthUserContext.Consumer>
        );
    }
}

export default withAuthorization(authCondition)(Profile);