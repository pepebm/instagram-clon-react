import React, { Component } from 'react';
import './addFriend.css';
import { userDB } from '../../firebase/index';
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
    InputAdornment,
    IconButton,
    TextField,
    Card,
    CardHeader,
    Tooltip,
    Zoom
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';


const byPropKey = (propertyName, value) => () => ({ [propertyName]: value });
const authCondition = (authUser) => !!authUser;
const initialState = {
    openDialog: false,
    search: '',
    error: null,
    user: null,
    userList: []
};

class AddFriend extends Component {
    constructor(props){
        super(props);
        this.state = {...initialState};
    }

    componentDidMount(){
        userDB.getUsers()
            .then(snapshot => 
                this.setState(byPropKey('userList', snapshot.val()))
            )
            .catch(err => {
                console.log(err);
                this.resetState();
            });
    }

    resetState = () => this.setState({...initialState});

    relatedItems() {
        const { search, userList, user } = this.state;
        let userListArr = Object.keys(userList).map(i => userList[i]);
        return userListArr.filter(u => {
            return (u.username.toLowerCase().search(search.toLowerCase()) !== -1) 
                    && (user.username !== u.username);
        });
    }

    returnUserId(user){
        const { userList } = this.state;
        let res = '';
        Object.keys(userList).forEach(u => {
            if (userList[u].username === user.username) res = u;
        });
        return res;
    }

    createRelation(currenId, friendId) {
        userDB.addFriend(currenId, friendId)
            .then(this.resetState)
            .catch(err => console.log(err));
    }
    
    searchBox = () =>
        <InputAdornment position="end">
            <IconButton disableRipple disabled>
                <SearchIcon/>
            </IconButton>
        </InputAdornment>


    render(){
        const { search, error, user, openDialog } = this.state;
        const items = this.relatedItems().map((opt, idx) => 
            <Card key={`search-${idx}`} style={{marginBottom: '1rem'}}>
                <CardHeader
                    title={`${opt.firstname} ${opt.lastname}`}
                    subheader={opt.username}
                    action={
                        <IconButton onClick={() => this.createRelation(user.uid, this.returnUserId(opt))}>
                            <AddCircleIcon/>
                        </IconButton>
                    }/>
            </Card>
            );
        
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
                    open={openDialog}
                    onClose={this.resetState}>
                    <DialogTitle id="form-dialog-title">Search</DialogTitle>
                    <DialogContent>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="search"
                                value={search}
                                name="search"
                                label="Username"
                                variant="outlined"
                                fullWidth
                                autoComplete="false"
                                InputProps={{
                                    endAdornment: this.searchBox()
                                }}
                                onChange={
                                    e => {
                                        this.setState(byPropKey('search', e.target.value));
                                        this.relatedItems();
                                    }
                                }/>
                        </FormControl>
                        { error && <DialogContentText>{error.message}</DialogContentText> }
                        { search !== "" ?  items : "" }
                        <DialogActions>
                            <Button onClick={this.resetState} color="secondary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
                <Tooltip 
                    TransitionComponent={Zoom} 
                    title="Add new friend"
                    placement="left"
                    disableFocusListener
                    disableTouchListener>
                    <Button
                        variant="fab" 
                        color="primary" 
                        aria-label="Follow"
                        className="action-btn-2"
                        onClick={
                            e => this.setState(byPropKey('openDialog', true))
                        }>
                        <PersonAddIcon/>
                    </Button>
                </Tooltip>
            </div>
        );
    }
}

export default withAuthorization(authCondition)(AddFriend);