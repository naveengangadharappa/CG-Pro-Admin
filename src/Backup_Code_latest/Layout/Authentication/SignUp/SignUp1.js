import React from 'react';
import { NavLink } from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { Signup } from "../../../network/Apicall"
import DEMO from "../../../store/constant";
import Loader from '../../../App/layout/Loader'

class SignUp1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            empid: "",
            fname: "",
            lname: "",
            designation: "",
            manager: "",
            email: "",
            password: "",
            validation_msg: "",
            validation_empid: "",
            validation_fname: "",
            validation_lname: "",
            validation_designation: "",
            validation_manager: "",
            validation_manager: "",
            validation_email: "",
            validation_password: "",
            validation_msg: "",
            loading: false,
            alertcolor: "green",
        }
        // this.submit = this.submit.bind(this);
    }

    submit = async () => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        let flg = expression.test(String(this.state.email).toLowerCase()) ? false : true;

        if (this.state.empid === "" || this.state.fname === "" || this.state.lname === "" || this.state.designation === "" || this.state.manager === "" || this.state.email === "" || this.state.password === "") {
            this.setState({ alertcolor: "red", validation_msg: "All feilds are Mandatory ." });
        } else if (flg) { this.setState({ validation_email: "invalid email", email: "" }) }
        else {
            let params = {
                uid: this.state.empid,
                ufname: this.state.fname,
                ulname: this.state.lname,
                udesig: this.state.designation,
                ureportingmgr: this.state.manager,
                uemail: this.state.email,
                upasswd: this.state.password,
                ustatus: false,
            }

            // this.setState({ validation_msg: "Registration successfull", loading: true }); //"Registration successfull"
            let result = await Signup(params);
            if (result.status) {
                console.log("true")
                this.setState({ alertcolor: "green", validation_msg: result.message, loading: false });
            } else {
                this.setState({ alertcolor: "red", validation_msg: result.message, loading: false });
            }

        }
    }

    render() {
        /*  if (this.state.loading) {
              return (<Aux>
                  <Loader />
              </Aux>)
          } else {*/
        return (
            <Aux>
                <Breadcrumb />
                {this.state.loading ? <Loader /> : null}
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
                                    <i className="feather icon-user-plus auth-icon" />
                                </div>
                                {String(this.state.validation_msg).length > 0 && this.state.alertcolor === "green" ? <p style={{ borderRadius: 5, padding: 10, backgroundColor: "lightgreen", borderColor: "red", borderWidth: 10 }}>{this.state.validation_msg}</p> : null}
                                {String(this.state.validation_msg).length > 0 && this.state.alertcolor === "red" ? <p style={{ borderRadius: 5, padding: 10, backgroundColor: "pink", borderColor: "red", borderWidth: 10 }}>{this.state.validation_msg}</p> : null}
                                <h3 className="mb-4">Sign up</h3>

                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Employee ID" name="empid" onChange={(e) => { e.target.value.includes("+") ? this.setState({ validation_empid: "Special chracter not allowed", empid: "" }) : this.setState({ empid: e.target.value, validation_empid: "" }) }} required />
                                </div>
                                {String(this.state.validation_empid).length > 0 ? <p style={{ color: "green" }}>{this.state.validation_empid}</p> : null}

                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="First Name" name="fname" onChange={(e) => { e.target.value.includes("+") ? this.setState({ validation_fname: "Special chracter not allowed", fname: "" }) : this.setState({ fname: e.target.value, validation_fname: "" }) }} required />
                                </div>
                                {String(this.state.validation_fname).length > 0 ? <p>{this.state.validation_fname}</p> : null}

                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Last Name" name="lname" onChange={(e) => { e.target.value.includes("+") ? this.setState({ validation_fname: "Special chracter not allowed", lname: "" }) : this.setState({ lname: e.target.value, validation_lname: "" }) }} required />
                                </div>
                                {String(this.state.validation_lname).length > 0 ? <p>{this.state.validation_lname}</p> : null}

                                <div className="input-group mb-3">
                                    <select className="form-control" name="design" onChange={(e) => { this.setState({ designation: e.target.value }) }}>
                                        <option value="">Select Designation</option>
                                        <option value="manager">Manager</option>
                                        <option value="developer">Developer</option>
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Reporting Manager" name="manager" onChange={(e) => { this.setState({ manager: e.target.value, validation_manager: "" }) }} required />
                                </div>
                                {String(this.state.validation_manager).length > 0 ? <p>{this.state.validation_manager}</p> : null}
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="official Email" name="email" onChange={(e) => { this.setState({ email: e.target.value, validation_email: "" }) }} required />
                                </div>
                                {String(this.state.validation_email).length > 0 ? <p>{this.state.validation_email}</p> : null}
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password" name="password" onChange={(e) => { this.setState({ password: e.target.value }) }} required />
                                </div>
                                {String(this.state.validation_password).length > 0 ? <p>{this.state.validation_password}</p> : null}
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="Retype password" name="rpassword" onChange={(e) => { this.setState({ password: e.target.value }) }} required />
                                </div>
                                {String(this.state.validation_password).length > 0 ? <p>{this.state.validation_password}</p> : null}
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.submit}>Sign up</button>
                                <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin-1">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
        // }
    }
}

export default SignUp1;