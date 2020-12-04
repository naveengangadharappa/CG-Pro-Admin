import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";
//import routes from "../routes";

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const menu = routes.map((route, index) => {
            return (route.component) ? (
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
        /*const menu1 = newroutes.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} />
                    )} />
            ) : (null);
        });*/

        return (
            <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            {menu}
                            <Route path="/" component={AdminLayout} />
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Aux>
            /*<Route render={(props) =>
                <ScrollToTop>
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            {menu}
                            <Route exact name="index" path="/" component={AdminLayout} />
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            }
            />*/
        );
    }
}

export default App;
