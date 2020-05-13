import React, { Fragment } from 'react'
import '../layout/messageStyle/messageHome.css'
import { Link } from 'react-router-dom';
import Axios from 'axios'
import auth from '../auth';
import moment from 'moment';
class MessageHomePage extends React.Component {
    state = {
        messageData : [],
        message: "",
        user:""
    }
    componentDidMount(){
        this.getData();
    }
    onFormSubmit = (e)=>{
        e.preventDefault();
        let user = auth.getUserData();
        Axios.post("http://localhost:8000/message",{
            message : this.state.message,
            user: user.id
        },auth.getConfig()).then((res) => {
            this.getData();
        });
    }
    getData = async() =>{
        await Axios.get("http://localhost:8000/message", auth.getConfig()).then((res) =>{
            this.setState({messageData: res.data});
        })
    }
    deleteMessage = (msgID) =>{
        Axios.delete(`http://localhost:8000/message/${msgID}`,auth.getConfig()).then(res => this.getData() );
    }
    render() {
        let user = auth.getUserData();
        let Messages = this.state.messageData.map((message, index) =>{
            return(
                <div className="card" key={message._id}>
                    <div className="card-header">
                        {message.user.username}
                        <div className="controllers">
                        {message.user._id === user.id || message.user === user.id? (
                            <Fragment>
                                <Link to={`/editMessage/${message._id}`} className="btn btn-primary operations">Edit</Link>
                                <Link onClick={() =>this.deleteMessage(message._id)} className="btn btn-danger operations">Delete</Link>
                            </Fragment>
                        ): (<span></span>)}
                        <Link to={`/message/${message._id}`} className="btn btn-info operations show">Show</Link>
                        </div>
                        <div className="dateContainer">
                        <span className="date">{moment(message.date).utc().format('YYYY-MM-DD')}</span>
                        </div>
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
                        <div className="col-5">
                            <form>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Message</label>
                                    <textarea className="form-control" placeholder="Write Your Message" id="exampleFormControlTextarea1" rows="3" onChange={(e) => {this.setState({message : e.target.value})}}></textarea>
                                    <small className="form-text text-muted">Add Message to Share Best Moment With Your Friends And Family.</small>
                                </div>
                                <button type="submit" className="btn btn-success submitBtn" onClick={this.onFormSubmit}>Add New Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default MessageHomePage;