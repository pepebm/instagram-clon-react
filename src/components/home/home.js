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

    componentDidMount() {
        db.ref().child('posts').on('value', snapshot => this.renderData(snapshot.val()));
        const postRef = db.ref().child('posts');
        postRef.on('child_added', snap => {
            const post = snap.val();
            const postList = this.state.postList;
            this.setState(byPropKey(
                'postList', 
                [...postList, post].sort((a, b) => {
                    a = new Date(a.createdAt);
                    b = new Date(b.createdAt);
                    return a > b ? -1 : a < b ? 1 : 0;
                }))
            );
        });
    }
    
    componentWillUnmount() {
        this.setState(byPropKey('postList', []))
    }

    renderData(data) {
        let newArray = [];
        for (const p in data) {
            newArray.push(data[p]);
        }
        console.log('hi');
        this.setState(byPropKey(
            'postList', 
            newArray.sort((a, b) => {
                    a = new Date(a.createdAt);
                    b = new Date(b.createdAt);
                    return a > b ? -1 : a < b ? 1 : 0;
                }))
            );
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
                        }
                    }}
                </AuthUserContext.Consumer>
                {list}
            </div>
        );
    }
}

export default withAuthorization(authCondition)(Home);