import React, { Component } from 'react';
import './profile.css';
import logo from '../nav/logo.png';
import AuthUserContext from '../AuthUserContext';
import withAuthorization from '../withAuthorization';
import { db } from '../../firebase/init';
import { userDB } from '../../firebase/index';
import EditProfile from './edit-profile/edit-profile';
import moment from 'moment';
import { 
    Grid, 
    Typography, 
    Divider, 
    Tabs, 
    Tab, 
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    GridList,
    GridListTile,
    GridListTileBar,
    Avatar
} from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import LoadingScreen from 'react-loading-screen';


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
    width: '70px',
    height: '70px',
    backgroundColor: randColor()
};
const TabContainer = props =>
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: true,
            value: 0,
            postList: [],
            friendList: [],
            userList: []
        };
    }
    
    // src: http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
    isEquivalent(a, b) {
        // Create arrays of property names
        if (b === null) b = {};
        let aProps = Object.getOwnPropertyNames(a);
        let bProps = Object.getOwnPropertyNames(b);
        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length !== bProps.length) return false;
        for (let i = 0; i < aProps.length; i++) {
            let propName = aProps[i];
            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) return false;
        }
        // If we made it this far, objects
        // are considered equivalent
        return true;
    }
    
    getArr = data => {
        let arr = [];
        for (const d in data) arr.push(data[d]);
        return arr;
    }

    getUserPosts(data, id){
        let postArr = this.getArr(data);
        this.setState(
            byPropKey('postList', postArr.filter(p => p.userId === id))
        );
        userDB.getUsers()
            .then(snapshot =>{
                const d = snapshot.val();
                const friends = this.getArr(d[id].friends);
                let friendsArr = [];
                friends.forEach(f => friendsArr.push({uid: f.userId, ...d[f.userId]}));
                this.setState(byPropKey('userList', this.getArr(d)));
                this.setState(byPropKey('friendList', friendsArr));
                this.setState(byPropKey('isLoading', false));
            })
            .catch(err => console.log(err));
    }

    deletePost(id) {
        db.ref(`posts/${id}`).remove()
            .then(console.log("Delete successful"))
            .catch(err => console.log(err));
    }

    friendView() {
        const { friendList, isLoading } = this.state;
        if(!isLoading){
            return(
                <div className="list-cont">
                    <List dense={false}>
                        {friendList.map((f,i) => 
                                    <ListItem key={`friend-${i}`}>
                                        <ListItemText
                                            primary={`${f.firstname} ${f.lastname}`}
                                            secondary={f.username}/>
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Remove friend">
                                                <RemoveCircleOutlineIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>)}
                    </List>
                </div>
            );
        }
    }

    gridView() {
        const { postList, isLoading } = this.state;
        if(!isLoading){
            return (
                <div className="list-cont">
                    <GridList
                        cellHeight={180}>
                        {postList.map((p,i) =>
                            <GridListTile key={`post-${i}`}>
                                <img src={p.image} alt={`Error with post: ${p.title}`}/>
                                <GridListTileBar
                                    title={p.title}
                                    subtitle={moment(p.createdAt).fromNow()}
                                    actionIcon={
                                        <IconButton
                                            color="primary"
                                            onClick={
                                                e => this.deletePost(`${p.userId}-${p.createdAt}`)
                                            }>
                                            <RemoveCircleOutlineIcon/>
                                        </IconButton>
                                    }/>
                            </GridListTile>
                        )}
                    </GridList>
                </div>
            );
        }
    }

    render(){
        const { user, isLoading, value } = this.state;
        return(
            <LoadingScreen
                loading={isLoading}
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
                textColor='#676767'
                logoSrc={logo}
                text="Loading data from the cloud">
                <Grid container>
                    <AuthUserContext.Consumer>
                        {authUser => {
                            if (!this.isEquivalent(authUser, user)) {
                                this.setState(byPropKey('user', {...authUser}));
                                db.ref().child('posts').on('value',
                                    snapshot => this.getUserPosts(snapshot.val(), authUser.uid)
                                );
                            }
                        }}
                    </AuthUserContext.Consumer>
                    {user && 
                        <Grid item xs={12}>
                            <div className="general-info">
                                {user.profilePicture ? 
                                        <Avatar src={user.profilePicture}
                                            className="center-avatar"
                                            style={avatarStyle}
                                            alt=""/>
                                    :
                                        <Avatar className="center-avatar" style={avatarStyle}>
                                                {`${user.firstname[0]} ${user.lastname[0]}`}
                                        </Avatar>
                                }
                                <Typography variant="h4" align="center" style={{marginTop: '1rem'}}>
                                    {user.username}
                                </Typography>
                                <Typography variant="h4" align="center">
                                    {`${user.firstname} ${user.lastname}`}
                                </Typography>
                                <Typography variant="h4" align="center">
                                    {user.email}
                                </Typography>
                                <Typography variant="h5" align="center">
                                    {user.description}
                                </Typography>
                            </div>
                            <EditProfile user={user}/>
                            <Divider style={{marginTop: '2rem'}}/>
                            <Tabs
                                value={value}
                                onChange={(e,v) => this.setState(byPropKey('value', v))}
                                indicatorColor="secondary"
                                textColor="secondary"
                                centered>
                                <Tab label="Posts"/>
                                <Tab label="Friends"/>
                            </Tabs>
                            {value === 0 && <TabContainer>{this.gridView()}</TabContainer>}
                            {value === 1 && <TabContainer>{this.friendView()}</TabContainer>}
                        </Grid>
                    }
                </Grid>
            </LoadingScreen>
        );
    }
}

export default withAuthorization(authCondition)(Profile);