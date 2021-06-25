import React, { Component } from 'react'
import axios from 'axios'


class LogupPart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            msg: ""
        }
        this.handleLogUp = this.handleLogUp.bind(this);
    }

    handleLogUp(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const API_URL = 'http://localhost:8080/u/logup';

        const postdata = {
            "id": data.get('email'),
            "name": data.get('name'),
            "dob": data.get('dob'),
            "gender": data.get('gender'),
            "address": data.get('address'),
            "mobile": data.get('mobile'),
            "password": data.get('password'),
            "email": data.get('email'),
            "userrole": ""
        };
        axios.post(API_URL, postdata)
            .then(res => {
                const datas = res.data;
                console.log(datas);
                if (res.data === true) {
                    alert('Registered successfully! Log in now');
                } else {
                    alert('User Already Exists');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    render() {
        return (
            <div>
                <div id="logup" className="modal-body ">
                    <form onSubmit={this.handleLogUp}>
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" placeholder="Your Email" />
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control" name="name" placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password" placeholder="Your Password" />
                        </div>
                        <div className="form-group">
                            <input type="tel" className="form-control" name="mobile" placeholder="Your mob" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="address" placeholder="Your City" />
                        </div>
                        <div className="form-group">
                            <input type="date" className="form-control" name="dob" placeholder="Your State" />
                        </div>
                        <div className="form-group">
                            <select id="ticket-type" name="gender" className="form-control">
                                <option value="">-- Select Gender --</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-danger">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default LogupPart
