import React, { Fragment } from 'react'
import '../layout/messageStyle/messageHome.css'
import { Link } from 'react-router-dom';
import Axios from 'axios'
import auth from '../auth';
class MessageHomePage extends React.Component {

    state = {
        token: localStorage.getItem('token'),
        messageData : []
    }
    componentDidMount(){
        console.log(auth.getToken());
        this.getData();
    }
    getData = () =>{
        const config = {
            headers : {
                "Content-type" : "application/json"
            }
        }
        const token = auth.getToken();
        if(token)
        {
            config.headers['x-auth-token'] = token;
            this.setState({token : token});
        }
        Axios.get("/message", config).then((res) =>{
            this.setState({messageData: res.data});
        })
    }
    render() {
        let Messages = this.state.messageData.map((message, index) =>{
            return(
                <div className="card">
                    <div className="card-header">
                        {message.user.username}
                        <Link to={`/message${message._id}`} className="btn btn-info controllers">Show</Link>
                        <span>{message.date}</span>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{message.message}</h5>
                    </div>
                </div>
            )
        })
        return (
            <Fragment>
                <h2>Welcome To Guestbook </h2>
                <div className="container">
                    <div className="row">
                        <div className="col-7">
                            {Messages}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default MessageHomePage;