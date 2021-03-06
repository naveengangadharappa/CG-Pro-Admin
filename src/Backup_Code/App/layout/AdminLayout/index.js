import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Fullscreen from "react-full-screen";
import windowSize from 'react-window-size';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
import { Constants } from '../../../network/Apicall';
import ProtectedRoute from "react-protected-route";

import './app.scss';

class AdminLayout extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        console.log("login ststus =" + Constants.user_profile.login_status)
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
        /* if (!Constants.user_profile.login_status) {
             return (<Aux>
                 <div>
                     <p>UnAuthorised Access Please <a href={'/auth/signin-1'}>Login</a></p>
                 </div>
             </Aux>
             )
         } else {*/


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
                        <route.component {...props} />
                    )} />
            ) : (null);
        });

        return (
            <Aux>
                <Fullscreen enabled={this.props.isFullScreen}>
                    <Navigation />
                    <NavBar {...this.props} />
                    <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
                        {/*<div className="pcoded-wrapper">
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">
                                    <Breadcrumb />
                                    <div className="main-body">
                                        <div className="page-wrapper">
                                            <Suspense fallback={<Loader />}>
                                                <Switch>
                                                    {menu}
                                                    <Redirect from="/" to={this.props.defaultPath} />
                                                </Switch>
                                            </Suspense>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                        <Suspense fallback={<Loader />}>
                            <Switch>
                                {menu}
                                <Redirect from="/" to={this.props.defaultPath} />
                            </Switch>
                        </Suspense>
                    </div>
                </Fullscreen>
            </Aux>
        );
        //  }
    }
}

const mapStateToProps = state => {
    return {
        defaultPath: state.defaultPath,
        isFullScreen: state.isFullScreen,
        collapseMenu: state.collapseMenu,
        configBlock: state.configBlock,
        layout: state.layout,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
        onComponentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(AdminLayout));