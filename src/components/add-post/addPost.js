import React, { Component } from 'react';
import './addPost.css';
import { postDB } from '../../firebase/index';
import withAuthorization from '../withAuthorization';
import AuthUserContext from '../AuthUserContext';


import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    FormControl,
    Input,
    InputLabel,
    Tooltip,
    Zoom
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


const byPropKey = (propertyName, value) => () => ({ [propertyName]: value });
const authCondition = (authUser) => !!authUser;
const initialState = {
    openDialog: false,
    title: '',
    file: '',
    error: null,
    user: null
};

class AddPost extends Component {
    constructor(props){
        super(props);
        this.state = {...initialState};
    }

    sendRequest(e) {
        const { title, file, user } = this.state;
        postDB.createPost(user.uid, title, file)
            .then(this.resetState())
            .catch(error => this.setState(byPropKey('error', error)));
    }

    resetState = () => this.setState({...initialState});

    render(){
        const { title, error, user, file } = this.state;
        const isInvalid = title === '' || file === '';
        return(
            <div>
                <AuthUserContext.Consumer>
                    {authUser => {
                        if (user !== authUser){
                            this.setState(byPropKey('user', authUser))
                        }
                    }}
                </AuthUserContext.Consumer>
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.resetState}>
                    <DialogTitle id="form-dialog-title">New Post</DialogTitle>
                    <DialogContent>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="title">Title</InputLabel>
                            <Input
                                id="title"
                                value={title}
                                name="title"
                                fullWidth
                                autoFocus
                                onChange={
                                    e => this.setState(byPropKey('title', e.target.value))
                                }/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="file">Image</InputLabel>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                fullWidth
                                onChange={
                                    e => this.setState(byPropKey('file', e.target.files[0]))
                                }/>
                        </FormControl>
                        { error && <DialogContentText>{error.message}</DialogContentText> }
                        <DialogActions>
                            <Button onClick={this.resetState} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={this.sendRequest.bind(this)} color="secondary" disabled={isInvalid}>
                                Post
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
                <Tooltip 
                    TransitionComponent={Zoom} 
                    title="Add new post"
                    placement="left"
                    disableFocusListener
                    disableTouchListener>
                    <Button
                        variant="fab" 
                        color="primary" 
                        aria-label="Add post"
                        className="action-btn"
                        onClick={
                            e => this.setState(byPropKey('openDialog', true))
                        }>
                        <AddIcon/>
                    </Button>
                </Tooltip>
            </div>
        );
    }
}

export default withAuthorization(authCondition)(AddPost);