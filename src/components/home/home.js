import React, { Component } from 'react';
import './home.css';
import withAuthorization from '../withAuthorization';
import { db } from '../../firebase/init';
import AuthUserContext from '../AuthUserContext';
import logo from '../nav/logo.png';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import LoadingScreen from 'react-loading-screen';



const authCondition = (authUser) => !!authUser;
const byPropKey = (propertyName, value) => () => ({ [propertyName]: value });

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            postList: [],
            isLoading: false
        };
        db.ref().child('posts').on('child_removed',
            snapshot => {
                this.setState(byPropKey('isLoading', true));
                const post = snapshot.val();
                const postList = this.state.postList;
                postList.forEach((p, idx) => {
                    if(p.createdAt === post.createdAt) {
                        this.setState(byPropKey('postList', {...postList.pop(idx)}))
                    }
                });
                this.setState(byPropKey('isLoading', false));
            }
        );
    }
    
    componentWillUnmount() {
        this.setState(byPropKey('postList', []));
    }

    renderData(data, id) {
        this.setState(byPropKey('isLoading', true));
        db.ref(`users/${id}`).on('value',
            f => {
                let friendsArr = [id];
                let newArray = [];
                let friends = f.val().friends;
                if (friends !== null) {
                    for (const fr in friends) {
                        friendsArr.push(friends[fr].userId);
                    }
                }
                for (const p in data) {
                    newArray.push(data[p]);
                }
                newArray = newArray.filter(p => friendsArr.includes(p.userId));
                this.setState(byPropKey(
                    'postList',
                    newArray.sort((a, b) => {
                        a = new Date(a.createdAt);
                        b = new Date(b.createdAt);
                        return a > b ? -1 : a < b ? 1 : 0;
                    })));
                this.setState(byPropKey('isLoading', false));
            },
            err => {
                console.log(err)
                this.setState(byPropKey('isLoading', false));
            });        
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        // Hours part from the timestamp
        const hours = date.getHours();
        // Minutes part from the timestamp
        const minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        const seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        return `${date.toLocaleDateString()} - ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
    }

    deletePost(id) {
        console.log(id);
        db.ref(`posts/${id}`).remove()
            .then(console.log("Delete successful"))
            .catch(err => console.log(err));
    }

    render(){
        const { user, postList, isLoading } = this.state;
        const list = postList.map((post, idx) =>
            <Card key={`${post.userId}-${idx}`} className="card-container">
                <CardHeader
                    title={post.title}
                    subheader={this.formatDate(post.createdAt)}
                    action={
                        <IconButton
                            aria-label="Delete post"
                            aria-expanded="Delete post"
                            onClick={
                                e => this.deletePost(`${post.userId}-${post.createdAt}`)
                            }>
                            <RemoveCircleOutlineIcon/>
                        </IconButton>
                    }/>
                <CardMedia
                    title=""
                    style={{height: 0, paddingTop: '56.25%'}}
                    image={post.image}/>
            </Card>
        );
        return(
            <div>
                <AuthUserContext.Consumer>
                    {authUser => {
                        if (user !== authUser){
                            this.setState(byPropKey('user', authUser));
                            document.title = `Instagram - ${authUser.username} Feed`;
                            db.ref().child('posts').on('value', 
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
                    {list}
                </LoadingScreen>
            </div>
        );
    }
}

export default withAuthorization(authCondition)(Home);