import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Fullscreen from "react-full-screen";
import windowSize from 'react-window-size';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Loader from "../Loader";
import routes from "../../../routes";
import routes1 from "../../../route";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
//import ProtectedRoute from "react-protected-route";
import { Offlinestorage } from "../../../network/Apicall";


import './app.scss';

class AdminLayout extends Component {

    componentDidMount = async () => {
        try {
            if (!this.props.login_status) {
                let offline_result = await Offlinestorage({ choice: 'getdata', key: 'userprofile' });
                if (offline_result.status) {
                    if (offline_result.data != null && offline_result.data.login_status) {
                        this.props.update_loginstatus();
                        this.props.update_userdetails({ userid: offline_result.data.userid, username: offline_result.data.username, email: offline_result.data.email, login_status: offline_result.data.login_status })
                    } else {
                        this.props.history.push({ pathname: '/auth/signin-1' });
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    fullScreenExitHandler = () => {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.props.onFullScreenExit();
        }
    };

    componentWillMount() {
        if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
            this.props.onComponentWillMount();
        }
    }

    mobileOutClickHandler() {
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            this.props.onComponentWillMount();
        }
    }

    render() {
        /* full screen exit call */
        document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);
        const menu = routes.map((route, index) => {
            return (route.component) ? (
                /*<ProtectedRoute
                    key={index}
                    isAuthenticated={Constants.user_profile.login_status}
                    redirectTo="/auth/signin-1"
                    path={route.path}
                    exact={route.exact}
                    component={props => (
                        <route.component {...props} />
                    )
                    }
                />*/
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} key={index} />
                    )} />
            ) : (null);
        });
        const menu_withoutauth = routes1.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} key={index} />
                    )} />
            ) : (null);
        });

        return (
            <Aux>
                <Fullscreen enabled={this.props.isFullScreen}>
                    <Navigation />
                    <NavBar {...this.props} />
                    <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
                        <Suspense fallback={<Loader />}>
                            <Switch>
                                {this.props.login_status ? menu : menu_withoutauth}
                                <Redirect from="/" to={this.props.login_status ? this.props.defaultPath : '/auth/signin-1'} />
                            </Switch>
                        </Suspense>
                    </div>
                </Fullscreen>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        defaultPath: state.defaultPath,
        isFullScreen: state.isFullScreen,
        collapseMenu: state.collapseMenu,
        configBlock: state.configBlock,
        layout: state.layout,
        login_status: state.login_status,
        user_details: state.user_details,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
        onComponentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
        update_loginstatus: () => dispatch({ type: actionTypes.LOGIN_STATUS }),
        update_userdetails: (data) => dispatch({ type: actionTypes.USER_DETAILS, data: data })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(AdminLayout));