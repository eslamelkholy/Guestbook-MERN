import React, { Fragment } from 'react'
import '../layout/messageStyle/messageHome.css'
import { Link } from 'react-router-dom';
class MessageHomePage extends React.Component {
    render() {
        return (
            <Fragment>
                <h2>Welcome To Guestbook </h2>
                <div className="container">
                    <div className="row">
                        <div className="col-7">
                            <div class="card">
                                <div class="card-header">
                                    Username
                                    <Link to="/message/:id" class="btn btn-info controllers">Show</Link>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Hello This Message</h5>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default MessageHomePage;