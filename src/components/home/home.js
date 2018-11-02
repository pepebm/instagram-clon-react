import React, { Component } from 'react';
import './home.css';
import withAuthorization from '../withAuthorization';
import { db } from '../../firebase/init';
import AuthUserContext from '../AuthUserContext';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';


const authCondition = (authUser) => !!authUser;
const byPropKey = (propertyName, value) => () => ({ [propertyName]: value });

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            postList: []
        };
    }
    
    componentWillUnmount() {
        this.setState(byPropKey('postList', []))
    }

    renderData(data, id) {
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
            },
            err => console.log(err));        
    }

    render(){
        const { user, postList } = this.state;
        const list = postList.map(post =>
            <Card key={`${post.userId}-${Math.floor(Math.random()*1000)}`} className="card-container">
                <CardHeader
                    title={post.title}
                    subheader={new Date(post.createdAt).toLocaleDateString()}/>
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
                            db.ref().child('posts').on('value', 
                                snapshot => this.renderData(snapshot.val(), authUser.uid)
                            );
                        }
                    }}
                </AuthUserContext.Consumer>
                {list}
            </div>
        );
    }
}

export default withAuthorization(authCondition)(Home);