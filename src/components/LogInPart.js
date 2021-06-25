import React, { Component } from 'react'
import axios from 'axios'

class LogInPart extends Component {


    constructor(props) {
        super(props)

        this.state = {
            msg: ""
        }
        this.handleLogIn = this.handleLogIn.bind(this);
    }


    handleLogIn(event) {
        event.preventDefault();
        var API_URL = "http://localhost:8080/login"
        const data = new FormData(event.target);
        console.log(data.get('username'));
        console.log(data.get('password'));
        axios.post(API_URL, {
            username: data.get('username'),
            password: data.get('password')
        })
            .then(response => {
                console.log(response.headers);
                if (response.headers.authorization != null 
                    && response.headers.authorization != "") {
                    localStorage.setItem("key", response.headers.authorization );
                    localStorage.setItem("user_role", response.headers.role );
                    localStorage.setItem("user_id", data.get("username"));
                    console.log(localStorage.getItem("key"));
                    window.location = "/";

                }
            })
            .catch(err => {
                this.setState({ msg: "Invalid Credentials" });
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <div id="login1" className="modal-body">
                    <form onSubmit={this.handleLogIn}>
                        <div className="form-group">
                            <input type="text" className="form-control" name="username" placeholder="Your Email" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="password" placeholder="Your Password" />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-danger">Log In</button>
                        </div>
                        <p>{this.state.msg}</p>
                    </form>
                </div>
            </div>
        )
    }
}

export default LogInPart
