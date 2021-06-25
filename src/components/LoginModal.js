import React, { Component } from 'react'
import LogInPart from './LogInPart'
import LogUpPart from './LogupPart'
import LoginDoctor from './LoginDoctorPart'


class LoginModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            valu: 0,
            msg: ""
        }

    }

    render() {
        return (
            <div>
                <div id="login-ticket-modal" className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="row">
                                    <div className="col-md-3 text-center">
                                        <h4 onClick={() => this.setState({ valu: 0, msg: "" })} id="loginbtn" className="modal-title ">Login</h4>
                                    </div>
                                    &nbsp; &nbsp;
                                    <div className="col-md-3 text-center">
                                        <h4 onClick={() => this.setState({ valu: 1, msg: "" })} id="logupbtn" className="modal-title ">Register</h4>
                                    </div>
                                </div>

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {(this.state.valu == 0)? <LogInPart/>: (this.state.valu == 1)? <LogUpPart/>: <LoginDoctor/>}
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginModal
