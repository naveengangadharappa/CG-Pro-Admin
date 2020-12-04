import React from 'react';
import { NavLink } from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { Login, Offlinestorage, Get_Login_status, Constants } from "../../../network/Apicall";
import disableBrowserBackButton from 'disable-browser-back-navigation';
import * as actionTypes from "../../../store/actions";
import { connect } from 'react-redux';

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
            disable: false,
        }
        this.submit = this.submit.bind(this);
    }

    componentDidMount = async () => {
        disableBrowserBackButton();
        try {
            if (!this.props.login_status) {
                let offline_result = await Offlinestorage({ choice: 'getdata', key: 'userprofile' });
                console.log("offline db result = ", offline_result);
                if (offline_result.status && offline_result.data) {
                    Constants.user_profile.userid = offline_result.data.userid;
                    Constants.user_profile.username = offline_result.data.username;
                    Constants.user_profile.email = offline_result.data.email;
                    Constants.user_profile.login_status = offline_result.data.login_status;
                    let params = {
                        type: "master",
                        userid: offline_result.data.userid,
                    }
                    let result = await Get_Login_status(params);
                    if (result.status) {
                        this.props.update_loginstatus();
                        this.props.update_userdetails({ userid: offline_result.data.userid, username: offline_result.data.username, email: offline_result.data.email, login_status: true })
                        this.props.history.push({ pathname: '/Users' })
                    }
                }
            } else {
                this.props.history.push({ pathname: '/Users' })
            }
        } catch (err) {
            console.log(err);
        }
    }

    submit = async () => {
        try {
            disableBrowserBackButton();
            if (String(this.state.empid).length > 0 && String(this.state.password).length > 0) {
                if (String(this.state.password).length < 8) {
                    this.setState({ validation_msg: "Password should be greater then 8 Characters" });
                } else {
                    let params = {
                        type: "master",  // type=”employee” for employee login
                        userid: this.state.empid,
                        password: this.state.password
                    }
                    this.setState({ disable: true });
                    let result = await Login(params);
                    this.setState({ disable: false });
                    if (result.status) {
                        //this.props.history.push({ pathname: '/dashboard' })
                        let storageresult = await Offlinestorage({ choice: 'adddata', key: 'userprofile', value: { login_status: true, userid: result.data.Id, username: result.data.name, email: result.data.email } });
                        console.log("offline result =", (storageresult));
                        if (storageresult.status) {
                            this.props.update_userdetails({ userid: result.data.Id, username: result.data.name, email: result.data.email, login_status: true });
                            this.props.update_loginstatus();
                            console.log("navigtion to user")
                            this.props.history.push({ pathname: '/Users' })
                        }
                    } else {
                        //let message = result.message
                        this.setState({ validation_msg: result.message });
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
                                <button className="btn btn-primary shadow-2 mb-4" onClick={() => { if (!this.state.disable) { this.submit() } }}>Login</button>
                                <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                {/*<p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        login_status: state.login_status,
        user_details: state.user_details,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        update_loginstatus: () => dispatch({ type: actionTypes.LOGIN_STATUS }),
        update_userdetails: (data) => dispatch({ type: actionTypes.USER_DETAILS, data: data })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp1);

//export default SignUp1;