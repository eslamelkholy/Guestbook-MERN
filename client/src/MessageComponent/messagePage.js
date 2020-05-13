import React, { Fragment } from 'react'
import '../layout/messageStyle/messageHome.css'
import { Link } from 'react-router-dom';
import Axios from 'axios'
import auth from '../auth';
import moment from 'moment';
class MessagePage extends React.Component {

    state = {
        repliesData : [],
        message: "",
        user:"",
        date:"",
        msgID:""
    }
    componentDidMount(){
        this.getMessageData();
    }
    getMessageData = async() =>{
        Axios(`http://localhost:8000/message/${this.props.match.params["id"]}`,getConfig())
        .then((selectedMsg) =>{
            this.setState({
                repliesData: selectedMsg.data.replies,
                message:selectedMsg.data.message,
                user:selectedMsg.data.user,
                date: selectedMsg.data.date,
                msgID:selectedMsg.data._id
            })
        }).catch(err => console.log(err))
    }
    onFormSubmit = (e)=>{
        e.preventDefault();
        let user = auth.getUserData();
        Axios.post("http://localhost:8000/message",{
            message : this.state.message,
            user: user.id
        },getConfig()).then((res) => {
            this.getData();
        });
    }
    deleteMessage = (msgID) =>{
        Axios.delete(`http://localhost:8000/message/${msgID}`,getConfig()).then(res => this.getData() );
    }
    render() {
        let user = auth.getUserData();
        return (
            <Fragment>
                <h2>Welcome To Guestbook </h2>
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            {this.state.user.username}
                            <div className="controllers">
                            {this.state.user._id === user.id ? (
                                <Fragment>
                                    <Link to={`/editMessage/${this.state.msgID}`} className="btn btn-primary operations">Edit</Link>
                                    <Link onClick={() =>this.deleteMessage(this.state.msgID)} className="btn btn-danger operations">Delete</Link>
                                </Fragment>
                            ): (<span></span>)}
                            </div>
                            <div className="dateContainer">
                            <span className="date">{moment(this.state.date).utc().format('YYYY-MM-DD')}</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{this.state.message}</h5>
                        </div>
                    </div>
                    <form className="col-6">
                        <div className="form-group">
                            <label for="exampleInputEmail1">Add Reply to This Message</label>
                            <textarea className="form-control" placeholder="Write Your Message" id="exampleFormControlTextarea1" rows="3" onChange={(e) => {this.setState({message : e.target.value})}}></textarea>
                            <small className="form-text text-muted">Add Reply to Share Best Moment With Your Friends And Family.</small>
                        </div>
                        <button type="submit" className="btn btn-success submitBtn" onClick={this.onFormSubmit}>Add New Reply</button>
                    </form>
                </div>
            </Fragment>
        )
    }
}
function getConfig(){
    const config = {
        headers : {
            "Content-type" : "application/json"
        }
    }
    const token = auth.getToken();
    if(token){
        config.headers['x-auth-token'] = token;
    }
    return config;
}
export default MessagePage;