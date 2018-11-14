import React from 'react';

import { firebase } from '../firebase/index';
import { db } from '../firebase/init';
import AuthUserContext from './AuthUserContext';

// HOC
const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null
            };
        }

        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                if (authUser) {
                    db.ref(`users/${authUser.uid}`).once('value')
                        .then(snapshot => 
                            this.setState({ authUser: {uid: authUser.uid, ...snapshot.val()}})
                        ).catch((e) => console.log(e));
                } else {
                    this.setState({authUser: null});
                }
            });
        }

        render() {
            const { authUser } = this.state;
            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }
    return WithAuthentication;
}

export default withAuthentication;