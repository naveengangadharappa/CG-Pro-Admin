import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));

const UIBasicButton = React.lazy(() => import('./Demo/UIElements/Basic/Button'));
const UIBasicBadges = React.lazy(() => import('./Demo/UIElements/Basic/Badges'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));

const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./Demo/UIElements/Basic/Typography'));

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));
const Users = React.lazy(() => import('./Layout/User/Users'));
const Employee = React.lazy(() => import('./Layout/User/Employee'));
const Levels = React.lazy(() => import('./Layout/Master/Levels'));
const SubLevels = React.lazy(() => import('./Layout/Master/SubLevel'));
const Questions = React.lazy(() => import('./Layout/Master/Question'));
const Hint = React.lazy(() => import('./Layout/Master/Hint'));
const Pattern = React.lazy(() => import('./Layout/Master/Pattern'));

const routes = [
    { path: '/Pattern', exact: true, name: 'Bootstrap Table', component: Pattern },
    { path: '/Hint', exact: true, name: 'Bootstrap Table', component: Hint },
    { path: '/Questions', exact: true, name: 'Bootstrap Table', component: Questions },
    { path: '/SubLevels', exact: true, name: 'Bootstrap Table', component: SubLevels },
    { path: '/Levels', exact: true, name: 'Bootstrap Table', component: Levels },
    { path: '/Employee', exact: true, name: 'Bootstrap Table', component: Employee },
    { path: '/Users', exact: true, name: 'Bootstrap Table', component: Users },
    { path: '/dashboard', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    { path: '/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/forms', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/tables', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
];

export default routes;