import React from 'react';

import { firebase } from '../firebase/index';
import AuthUserContext from './AuthUserContext';

// HOC
const withAuthorization = (Component) => {
    class WithAuthorization extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null
            };
        }

        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                authUser ? this.setState({ authUser }) : this.setState({authUser: null});
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
    return WithAuthorization;
}

export default withAuthorization;