import React from 'react';
import { NavLink } from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { Login, Offlinestorage } from "../../../network/Apicall";
import disableBrowserBackButton from 'disable-browser-back-navigation';

class SignUp1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            empid: "",
            password: "",
            validation_msg: "",
            validation_empid: "",
            validation_password: "",
            loading: false,

        }
        this.submit = this.submit.bind(this);
    }

    componentDidMount = () => {
        disableBrowserBackButton();
    }

    submit = async () => {
        try {
            disableBrowserBackButton();
            if (String(this.state.empid).length > 0 && String(this.state.password).length > 0) {
                if (String(this.state.password).length < 8) {
                    this.setState({ validation_msg: "Password should br greater then 8 Characters" });
                } else {
                    let params = {
                        type: "master",  // type=”employee” for employee login
                        userid: this.state.empid,
                        password: this.state.password
                    }
                    let result = await Login(params);
                    if (result.status) {
                        //this.props.history.push({ pathname: '/dashboard' })
                        let storageresult = await Offlinestorage({ choice: 'adddata', key: 'userprofile', value: { login_status: true, userid: result.data.Id, username: result.data.name, email: result.data.email } });
                        console.log("offline result =", (storageresult));
                        if (storageresult.status) {
                            console.log("navigtion to user")
                            this.props.history.push({ pathname: '/Users' })
                        }
                    } else {
                        let message = result.message
                        /*if (result.validation) {
                            console.log("entered validation");
                            let validation = result.validation.errors;
                            let message = (validation.userid)
                        }*/
                        this.setState({ validation_msg: message });
                    }
                }
            } else {
                this.setState({ validation_msg: "EmployeeId and Password Required" });
            }
        } catch (err) {
            console.log(err);
        }
    }

    validation = async (e) => {
        if (e.target.value.includes("+") || e.target.value.includes(" ") || e.target.value.includes("/") || e.target.value.includes("-")) {
            this.setState({ validation_empid: "Special chracter not allowed" });
        } else {
            this.setState({ empid: e.target.value, validation_empid: '' });
        }
    }

    render() {
        return (
            <Aux>
                <Breadcrumb />
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r" />
                            <span className="r s" />
                            <span className="r s" />
                            <span className="r" />
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon" /><h5 className="mb-2">Welcome to CGPro</h5>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                {/*<div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email" />
                                </div>*/}
                                {String(this.state.validation_msg).length > 0 ? <p style={{ color: "darkred" }}>{this.state.validation_msg}</p> : null}

                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="EmployeeId" value={this.state.empid} onChange={(e) => { this.validation(e) }} required />
                                </div>
                                {String(this.state.validation_empid).length > 0 ? <p style={{ color: "darkred" }}>{this.state.validation_empid}</p> : null}

                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} required />
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                        <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.submit}>Login</button>
                                <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp1;