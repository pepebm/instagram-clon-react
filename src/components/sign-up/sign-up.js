import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import * as routes from '../../constants/routes';
import { auth, userDB } from '../../firebase/index';
import './sign-up.css';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const byPropKey = (propertyName, value) => () => ({ [propertyName]: value });
class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            cpassword: '',
            description: '',
            error: null
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            lastName,
            username,
            email,
            password,
            description
        } = this.state;
        const {
            history
        } = this.props;
        // Create a valid login for the user
        auth.createUser(email, password)
            .then(usr => {
                // Save the user un the real time db
                userDB.createUserInDatabase(usr.user.uid, name, lastName, username, email, description, " ")
                    .then(history.push(routes.HOME))
                    .catch(err => this.setState(byPropKey('error', err)))
                ;
            }, err => {
                this.setState(byPropKey('error', err));
            })
    }

    render(){
        const {
            name,
            lastName,
            username,
            email,
            password,
            cpassword,
            error,
            description
        } = this.state;

        const isInvalid = password !== cpassword 
            || password === ''
            || email === ''
            || name === ''
            || lastName === ''
            || username === ''
            || description === ''
        ;
        return(
            <div className='layout'>
                <CssBaseline/>
                <Paper className='paper'>
                    <Avatar className='avatar'>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        New user
                    </Typography>
                    <form className='form' onSubmit={this.onSubmit}>
                        <FormControl margin="normal" required className="half-size-input">
                            <InputLabel htmlFor="name">First Name</InputLabel>
                            <Input 
                                id="name" 
                                value={name}
                                onChange = {
                                    event => this.setState(byPropKey('name', event.target.value))
                                }
                                name="name" 
                                type="text" 
                                autoFocus 
                            />
                        </FormControl>
                        <FormControl margin="normal" required className="half-size-input">
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input 
                                id="lastName" 
                                value={lastName}
                                onChange = {
                                    event => this.setState(byPropKey('lastName', event.target.value))
                                }
                                name="name" 
                                type="text" 
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input 
                                id="username" 
                                name="username"
                                value={username}
                                onChange = {
                                    event => this.setState(byPropKey('username', event.target.value))
                                }
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input 
                                id="email" 
                                name="email"
                                value={email}
                                onChange = {
                                    event => this.setState(byPropKey('email', event.target.value))
                                }
                                type="email" 
                                autoComplete="email" 
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                value={password}
                                onChange = {
                                    event => this.setState(byPropKey('password', event.target.value))
                                }
                                id="password"
                                autoComplete="current-password"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="cpassword">Confirm Password</InputLabel>
                            <Input
                                name="cpassword"
                                type="password"
                                id="cpassword"
                                value={cpassword}
                                onChange = {
                                    event => this.setState(byPropKey('cpassword', event.target.value))
                                }
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="desc">Tell us something about yourself</InputLabel>
                            <Input
                                name="desc"
                                type="text"
                                id="desc"
                                value={description}
                                onChange = {
                                    event => this.setState(byPropKey('description', event.target.value))
                                }
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="btn"
                            disabled={isInvalid}
                        >
                        Join
                        </Button>
                        { error && <p>{error.message}</p> }
                    </form>
                </Paper>
            </div>
        );
    }
}

export default withRouter(Signup);