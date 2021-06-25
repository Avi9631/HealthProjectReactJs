import React, { Component } from 'react'
import axios from 'axios'


export class BookAppointment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            did: "",
            date: "",
            slot: ""
        };

        // this.handleSlotCheck= this.handleSlotCheck.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
        console.log(this.props.name)
    }


    handleSlotCheck(event) {
        // const API_URL = "http://localhost:8080/checkSlot";
        // event.preventDefault();
        // const data = new FormData(event.target);
        // axios.post(API_URL, {
        //     docid: data.get('did'),
        //     date: data.get('date'),
        //     slot: data.get('slots'),
        // } )
        //   .then(response => {
        //       if(response.data==true){
        //         alert("Slot Available");
        //       }else{
        //         alert("Slot Not Available");
        //       }
        //   })
        //   .catch(err=>{
        //       console.log(err);
        //   });
        alert(this.state.slot + "----" + this.state.date);
    }

    handlesubmit(event) {
        const API_URL = "http://localhost:8080/u/bookAppoint";
        event.preventDefault();
        const data = new FormData(event.target);
        axios.post(API_URL, {
            id: " ",
            userid: localStorage.getItem("user_id"),
            docid: data.get('did'),
            docname: data.get('dname'),
            docspe: data.get('dspe'),
            prescrip: "",
            date: data.get('date'),
            slot: data.get('slots'),
            status: "Pending"
        },  {headers : {
            authorization : localStorage.getItem('key')
        }})
            .then(response => {
                if (response.data === true) {
                    alert("appointment booked successfully");
                } else {
                    alert("Appointment Slot Unavailable");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <div id="bookApp-ticket-modal" className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title ">Book Appointment</h4>

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body" >
                                <form onSubmit={this.handlesubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control disabled" name="did" value={this.props.did} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control disabled" name="dname" value={this.props.dname} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="dspe" value={this.props.dspe} />
                                    </div>
                                    <div className="form-group">
                                        <input type="date" className="form-control" name="date" />
                                    </div>
                                    <div className="form-group">
                                        <select id="ticket-type" name="slots" className="form-control">
                                            <option value="">-- Select Slots --</option>
                                            <option value="s1">11:00</option>
                                            <option value="s2">12:00</option>
                                            <option value="s3">1:00</option>
                                            <option value="s4">3:00</option>
                                            <option value="s5">4:00</option>
                                        </select>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-danger">
                                            Book Appointment</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}





export default BookAppointment