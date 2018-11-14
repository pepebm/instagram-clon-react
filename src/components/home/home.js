import React, { Component } from 'react';
import './home.css';
import withAuthorization from '../withAuthorization';
import { db } from '../../firebase/init';
import AuthUserContext from '../AuthUserContext';
import logo from '../nav/logo.png';

import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import LockIcon from '@material-ui/icons/Lock';
import LoadingScreen from 'react-loading-screen';
import { Typography } from '@material-ui/core';



const authCondition = (authUser) => !!authUser;
const byPropKey = (propertyName, value) => () => ({ [propertyName]: value });

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            postList: [],
            userList: [],
            isLoading: false
        };
    }

    componentWillMount() {
        this.setState(byPropKey('isLoading', true));
        // WebHook: Remove post from current list
        db.ref().child('posts').on('child_removed',
            snapshot => {
                this.setState(byPropKey('isLoading', true));
                const postDate = snapshot.val().createdAt;
                const postList = this.state.postList;
                postList.forEach((p, idx) => {
                    if (p.createdAt === postDate) {
                        this.setState(byPropKey('postList', { ...postList.pop(idx)}))
                        return;
                    }
                });
                this.setState(byPropKey('isLoading', false));
            }
        );
        // Not WebHook
        db.ref('users').once('value')
            .then(snapshot =>
                this.setState(byPropKey('userList', this.getArr(snapshot.val())))
            )
            .then(() => this.setState((byPropKey('isLoading', false))))
            .catch(err => console.log(err));
    }
    
    componentWillUnmount() {
        this.setState(byPropKey('postList', []));
        this.setState(byPropKey('userList', []));
    }

    renderData(data, id) {
        db.ref(`users/${id}`).on('value',
            f => {
                let friendsArr = [id];
                let newArray = [];
                let friends = f.val().friends;
                if (friends !== null)
                    for (const fr in friends) 
                        friendsArr.push(friends[fr].userId);
                for (const p in data)
                    newArray.push(data[p]);
                newArray = newArray.filter(p => friendsArr.includes(p.userId));
                this.setState(byPropKey(
                    'postList',
                    newArray.reverse()
                ));
            },
            err => console.log(err));
    }

    getArr = data => {
        let arr = [];
        for (const d in data) arr.push({id: d, ...data[d]});
        return arr;
    }

    deletePost(id) {
        db.ref(`posts/${id}`).remove()
            .then(console.log("Delete successful"))
            .catch(err => console.log(err));
    }

    deleteWithPermission(post) {
        const { user } = this.state;
        if (user.uid === post.userId){
            return (
                <IconButton
                    aria-label="Delete post"
                    aria-expanded="true"
                    onClick={
                        e => this.deletePost(`${post.userId}-${post.createdAt}`)
                    }>
                    <RemoveCircleOutlineIcon/>
                </IconButton>
            );
        } else {
            return (
                <IconButton disabled
                    aria-label="You do not own this post"
                    aria-expanded="true">
                    <LockIcon/>
                </IconButton>
            );
        }
    }

    list() {
        const { postList, userList } = this.state;
        return postList.map((post, idx) => {
                let usr = "";
                try {
                    usr =  userList.find(u => u.id === post.userId).username;
                } catch (error) {
                    usr = "Loading username...";
                }
                return (
                    <Card key={`${post.userId}-${idx}`} className="card-container">
                        <CardHeader
                            title={post.title}
                            subheader={usr}
                            action={this.deleteWithPermission(post)}/>
                        <CardMedia
                            title=""
                            style={{height: 0, paddingTop: '56.25%'}}
                            image={post.image}/>
                        <CardContent>
                            <Typography component="p">
                                {moment(post.createdAt).fromNow()}
                            </Typography>
                        </CardContent>
                    </Card>
                );
            });
    }

    render(){
        const { user, isLoading  } = this.state;
        return(
            <div>
                <AuthUserContext.Consumer>
                    {authUser => {
                        if (user !== authUser){
                            this.setState(byPropKey('user', authUser));
                            document.title = `Instagram - ${authUser.username} Feed`;
                            db.ref().child('posts').orderByChild('createdAt').on('value', 
                                snapshot => this.renderData(snapshot.val(), authUser.uid)
                            );
                        }
                    }}
                </AuthUserContext.Consumer>
                <LoadingScreen
                    loading={isLoading}
                    bgColor='#f1f1f1'
                    spinnerColor='#9ee5f8'
                    textColor='#676767'
                    logoSrc={logo}
                    text="Loading data from the cloud">
                    { !isLoading && <div>{this.list()}</div> }
                </LoadingScreen>
            </div>
        );
    }
}

export default withAuthorization(authCondition)(Home);