import React, { Fragment } from 'react'
import '../layout/messageStyle/messageHome.css'
import { Link } from 'react-router-dom';
import Axios from 'axios'
import auth from '../auth';
import HeaderPage from './HeaderPage';
import moment from 'moment';
class MessagePage extends React.Component {

    state = {
        repliesData : [],
        message: "",
        user:"",
        date:"",
        msgID:"",
        newReply:""
    }
    componentDidMount(){
        this.getMessageData();
    }
    getMessageData = async() =>{
        Axios(`http://localhost:8000/message/${this.props.match.params["id"]}`,auth.getConfig())
        .then((selectedMsg) =>{
            this.setState({
                repliesData: selectedMsg.data.replies,
                message:selectedMsg.data.message,
                user:selectedMsg.data.user,
                date: selectedMsg.data.date,
                msgID:selectedMsg.data._id
            });
        }).catch(err => console.log(err))
    }
    onFormSubmit = (e)=>{
        e.preventDefault();
        let user = auth.getUserData();
        Axios.post("http://localhost:8000/messagereply",{
            replyBody : this.state.newReply,
            user: user.id,
            message:this.state.msgID
        },auth.getConfig()).then((res) => {
            this.getMessageData();
        });
    }
    deleteMessage = (msgID) =>{
        Axios.delete(`http://localhost:8000/message/${msgID}`,auth.getConfig()).then(res => this.props.history.push("/home") );
    }
    render() {
        let user = auth.getUserData();
        let Replies = this.state.repliesData.map((reply, index) =>{
            return(
                <div className="card col-12">
                    <div className="card-header">
                        {reply.user.username}
                        <div className="dateContainer">
                            <span className="date">{moment(reply.date).utc().format('YYYY-MM-DD')}</span>
                        </div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{reply.replyBody}</h5>
                    </div>
                </div>
            )
        })
        return (
            <Fragment>
            <HeaderPage/>
                <h2>Welcome To Guestbook </h2>
                <div className="container">
                    <div className="card col-9">
                        <div className="card-header">
                            <h5>{this.state.user.username}</h5>
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
                            <textarea className="form-control" placeholder="Write Your Message" id="exampleFormControlTextarea1" rows="3" onChange={(e) => {this.setState({newReply : e.target.value})}}></textarea>
                            <small className="form-text text-muted">Add Reply to Share Best Moment With Your Friends And Family.</small>
                        </div>
                        <button type="submit" className="btn btn-success submitBtn" onClick={this.onFormSubmit}>Add New Reply</button>
                        <div className="replies">
                              <h3>Message Replies</h3>
                                {Replies}
                        </div>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default MessagePage;