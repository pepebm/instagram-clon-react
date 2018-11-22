import React, { Component } from 'react';
import withAuthorization from '../../withAuthorization';
import './edit-profile.css';
import { userDB } from '../../../firebase/index';

import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    FormControl,
    Input,
    InputLabel,
    Button,
    Grid,
    Avatar,
    Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';


const byPropKey = (propertyName, value) => () => ({ [propertyName]: value });
const authCondition = (authUser) => !!authUser;
const randColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) 
        color += letters[Math.floor(Math.random() * 16)];
    // All but white
    return color !== '#FFFFFF' ? color : randColor();
};
const avatarStyle = {
    float: 'right',
    marginRight: '2rem',
    width: '70px',
    height: '70px',
    backgroundColor: randColor()
};

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.user,
            open: false,
            error: null
        };
    }

    convertToB64 = (file) => new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = err => reject(err);
        fileReader.readAsDataURL(file);
    })

    savePic = file =>
        this.convertToB64(file)
            .then(f => this.setState(byPropKey('profilePicture', f)))
            .catch(err => this.setState(byPropKey('error', err.message)));

    saveProfile(){
        const { username, firstname, lastname, 
                description, profilePicture } = this.state;
        userDB.editUserInDatabase(this.props.user.uid, firstname, lastname, username, description, profilePicture)
            .then(() => {
                this.setState(byPropKey('open', false));
                window.location.reload();
            })
            .catch(err => this.setState(byPropKey('error', err)));
    }

    render(){
        const { username, firstname, lastname, 
                description, profilePicture, open, error } = this.state;
        return (
            <div>
                <Button
                    id="editProf"
                    variant="outlined" 
                    color="secondary" 
                    className="center-block"
                    onClick={() => this.setState({...this.props.user, open: true})}>
                    Edit <EditIcon className="baseline-icon"/>
                </Button>
                <Dialog
                    open={open}
                    onClose={() => this.setState(byPropKey('open', false))}>
                    <DialogTitle>
                        Edit profile
                    </DialogTitle>
                    <DialogContent>
                        <form className='form' onSubmit={this.onSubmit}>
                            <Grid container>
                                <Grid item sm={6} xs={12}>
                                    {profilePicture ? 
                                            <Avatar src={profilePicture}
                                                    style={avatarStyle}
                                                    className="profile-pic" 
                                                    alt=""/>
                                        :
                                            <Avatar style={avatarStyle}>
                                                {`${firstname[0]} ${lastname[0]}`}
                                            </Avatar>
                                    }
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl margin="normal" fullWidth>
                                        <Typography component="p">
                                            Change profile picture
                                        </Typography>
                                        <Input
                                            id="file"
                                            name="file"
                                            type="file"
                                            fullWidth
                                            onChange={
                                                e => this.savePic(e.target.files[0])
                                            }/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl margin="normal" required className="half-size-input">
                                        <InputLabel htmlFor="firstname">First Name</InputLabel>
                                        <Input 
                                            id="firstname" 
                                            value={firstname}
                                            onChange = {
                                                event => this.setState(byPropKey('firstname', event.target.value))
                                            }
                                            name="name" 
                                            type="text" 
                                            autoFocus/>
                                    </FormControl>
                                    <FormControl margin="normal" required className="half-size-input">
                                        <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                        <Input 
                                            id = "lastname"
                                            value={lastname}
                                            onChange = {
                                                event => this.setState(byPropKey('lastname', event.target.value))
                                            }
                                            name="lastname" 
                                            type="text"/>
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="username">Username</InputLabel>
                                        <Input 
                                            id="username" 
                                            name="username"
                                            value={username}
                                            onChange = {
                                                event => this.setState(byPropKey('username', event.target.value))
                                            }/>
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="description">Description</InputLabel>
                                        <Input 
                                            id="description" 
                                            name="description"
                                            value={description}
                                            onChange = {
                                                event => this.setState(byPropKey('description', event.target.value))
                                            }
                                            type="text"/>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        className="btn-cancel"
                                        style={{marginTop: '2rem'}}
                                        onClick={() => this.setState(byPropKey('open', false))}>
                                    Cancel
                                    </Button>
                                </Grid>
                                <Grid item sm={8} xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        style={{marginTop: '2rem'}}
                                        onClick={() => this.saveProfile()}>
                                    Save
                                    </Button>
                                </Grid>
                            </Grid>
                            { error && <p>{error.message}</p> }
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withAuthorization(authCondition)(EditProfile);