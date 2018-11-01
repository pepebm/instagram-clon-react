import React, { Component } from 'react';
import './home.css';
import withAuthorization from '../withAuthorization';
import { userDB, postDB } from '../../firebase/index';
import AuthUserContext from '../AuthUserContext';

import Typography from '@material-ui/core/Typography';


const authCondition = (authUser) => !!authUser;
const byPropKey = (propertyName, value) => () => ({ [propertyName]: value });

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }
    getPosts(id) {
        if(true){
            postDB.getPosts(id)
                .then(res => console.log(res))
                .catch(e => console.log(e));
            userDB.getUsers()
                .then(res => console.log(res))
                .catch(e => console.log(e));
        }
    }

    render(){
        const { user } = this.state;
        return(
            <div>
                <AuthUserContext.Consumer>
                    {authUser => {
                        if (user !== authUser){
                            //this.setState(byPropKey('user', authUser));
                            this.getPosts(authUser.uid);
                        }
                    }}
                </AuthUserContext.Consumer>
                <Typography component= "h1" variant= "h5">
                    Hello World
                </Typography>
            </div>
        );
    }
}

export default withAuthorization(authCondition)(Home);