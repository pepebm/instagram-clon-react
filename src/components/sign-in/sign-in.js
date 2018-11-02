import React, { Component } from 'react';
import './sign-in.css';
import { auth } from '../../firebase/index';
import * as routes from '../../constants/routes';

import { Link, withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});
class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null
        };
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        const {
            email,
            password,
        } = this.state;
        const {
            history
        } = this.props;

        auth.signinUser(email, password)
            .then(() => { 
                history.push(routes.HOME);
            }, err => {
                this.setState(byPropKey('error', err));
            });
    }

    render(){
        const {
            email,
            password,
            error,
        } = this.state;
        const isInvalid = password === '' || email === '';

        return(
            <div className='layout'>
                <CssBaseline/>
                <Paper className='paper'>
                    <Avatar className='avatar'>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className='form' onSubmit={this.onSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input 
                                id="email" 
                                name="email" 
                                type="email" 
                                autoComplete="email"
                                value={email}
                                onChange = {
                                    e => this.setState(byPropKey('email', e.target.value))
                                }
                                autoFocus 
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                value={password}
                                onChange = {
                                    e => this.setState(byPropKey('password', e.target.value))
                                }
                                autoComplete="current-password"
                            />
                        </FormControl>
                        <Link to={routes.SIGN_UP} >
                            <Button
                                color="error"
                                className="new-account" >
                                <FiberNewIcon/> Create account
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isInvalid}>
                            Enter
                        </Button>
                        { error && <p>{error.message}</p> }
                    </form>
                </Paper>
            </div>
        );
    }
}

export default withRouter(Signin);