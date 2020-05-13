import React, { Fragment } from 'react'
import '../layout/messageStyle/messageHome.css'
import Axios from 'axios'
import auth from '../auth';
import HeaderPage from './HeaderPage';
class EditMessagePage extends React.Component {

    state = {
        message: "",
    }
    componentDidMount(){
        this.getMessageData();
    }
    getMessageData = async() =>{
        Axios.get(`http://localhost:8000/message/${this.props.match.params["id"]}`,auth.getConfig())
        .then((selectedMsg) =>{
            this.setState({
                message:selectedMsg.data.message,
        });
        }).catch(err => console.log(err))
    }
    onFormSubmit = (e)=>{
        e.preventDefault();
        Axios.patch(`http://localhost:8000/message/${this.props.match.params["id"]}`,{
            message : this.state.message,
        },auth.getConfig()).then((res) => {
            this.props.history.push("/home");
        });
    }
    render() {

        return (
            <Fragment>
            <HeaderPage/>
                <h2>Welcome To Guestbook </h2>
                <div className="container">
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Message</label>
                            <textarea className="form-control" placeholder="Write Your Message" id="exampleFormControlTextarea1" rows="3" value={this.state.message} onChange={(e) => {this.setState({message : e.target.value})}}></textarea>
                            <small className="form-text text-muted">Add Message to Share Best Moment With Your Friends And Family.</small>
                        </div>
                        <button type="submit" className="btn btn-success submitBtn" onClick={this.onFormSubmit}>Add New Message</button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default EditMessagePage;