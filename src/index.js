import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const testData = [
    { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "facebook.com" },
    { name: "Evan Phoenix", avatar_url: "https://avatars0.githubusercontent.com/u/7?v=4", company: "twitter.com" },
    { name: "Chris Van Pelt", avatar_url: "https://avatars1.githubusercontent.com/u/17?v=4", company: "crowdflower.com" },
];

const CardList = (props) => (

    <div >
        {props.profiles.map(pro => <Card key={pro.id}  {...pro} />)}
    </div>


);

class Card extends React.Component {

    render() {
        const profile = this.props;
        return (
            <div className="github-profile" style={{ margin: '1rem' }}>
                <img src={profile.avatar_url} style={{ width: '100px', height: '100px' }} />
                <div className="info" style={{ display: 'inline-block', marginLeft: '15px' }}>
                    <div className="name" style={{ fontSize: '125%' }} >{profile.name}</div>
                    <div className="company" >{profile.company}</div>

                </div>
            </div>
        );

    }

}

class App extends React.Component {

    state = {
        profiles: [],
    };
    addNewProfile = (profileData) => {
      this.setState(x => ({
    profiles: [...x.profiles,profileData],
    }));

    };

   
    render() {

        return (
            <div>
                <div className="header" style={{ textAlign: 'center' }}>{this.props.title}</div>
                <Form onSubmit={this.addNewProfile} />
                <CardList profiles={this.state.profiles} />
              
            </div>

        );
    }

}

class Form extends React.Component {

    state = { userName: '' };
    userNameInput = React.createRef();

    handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
        this.props.onSubmit(resp.data);

    };
    render() {


        return (
            <form onSubmit={this.handleSubmit} style={{ margin: '1rem', padding_left: '15px' }} >
                <input onChange={event => this.setState({ userName: event.target.value })} value={this.state.userName} type="text" placeholder="GitHub UserName" required />
                <button  className="btn btn-success" >Add Card</button>
            </form>


        );
    };
}

ReactDOM.render(

    <div >
        <App title="The Github Cards App" />
    </div>
    ,
    document.getElementById('root')

);