import React from 'react';
import { Dropdown } from 'react-bootstrap';

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import { Logout, Constants, Offlinestorage } from "../../../../../network/Apicall";
import * as actionTypes from "../../../../../store/actions";
import { connect } from 'react-redux';


class NavRight extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listOpen: false,
            username: '',
            userid: '',
        };
    }

    componentDidMount = async () => {
        try {
            this.setState({ username: this.props.user_details.username })

        } catch (err) {
            console.log(err);
        }
    }

    logout = async () => {
        try {
            let confirm = window.confirm("Are you shure to logout  ");
            if (confirm) {
                let params = {
                    type: "master",
                    userid: Constants.user_profile.userid
                }
                let result = await Logout(params);
                if (result.status) {
                    Constants.user_profile.userid = '';
                    Constants.user_profile.login_status = '';
                    Constants.user_profile.username = '';
                    let offline_result = await Offlinestorage({ choice: 'clear' });
                    if (offline_result.status) {
                        console.log("DB Cleared Successfully");
                        this.props.update_loginstatus();
                        this.props.update_userdetails({})
                        this.props.history.push({ pathname: '/auth/signin-1' });
                        alert(result.message);
                    }
                } else {
                    //this.props.history.push({ pathname: '/auth/signin-1' });
                    alert("Logout Unsuccessful " + result.message);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {


        return (
            <Aux>
                <ul className="navbar-nav ml-auto">

                    <li>
                        {/*<Dropdown alignRight={!this.props.rtlLayout} className="drp-user">*/}
                        <Dropdown alignRight={!false} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-settings" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile" />
                                    <span>{this.props.user_details.username}</span>
                                    <a href={DEMO.BLANK_LINK} className="dud-logout" title="Logout" onClick={this.logout}>
                                        <i className="feather icon-log-out" />
                                    </a>
                                </div>
                                <ul className="pro-body">
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item" onClick={() => { this.props.history.push({ pathname: '/Profile', state: 'profile' }) }}><i className="feather icon-user" /> Profile</a></li>

                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>

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


export default connect(mapStateToProps, mapDispatchToProps)(NavRight);
