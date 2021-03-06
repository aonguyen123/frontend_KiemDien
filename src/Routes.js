import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
    Dashboard as DashboardView,
    ClassList as ClassListView,
    UserList as UserListView,
    Typography as TypographyView,
    Icons as IconsView,
    Account as AccountView,
    Settings as SettingsView,
    SignIn as SignInView,
    NotFound as NotFoundView,
    InternalServerError as InternalServerErrorView,
    ClassDetail as ClassDetailView,
    Assignes as AssignesView,
    Presences as PresencesView,
    PresencesDetail as PresencesDetailView
} from './views';

const Routes = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <RouteWithLayout
                component={DashboardView}
                exact
                layout={MainLayout}
                path="/dashboard"
            />
            <RouteWithLayout
                component={UserListView}
                exact
                layout={MainLayout}
                path="/users"
            />
            <RouteWithLayout
                component={ClassListView}
                exact
                layout={MainLayout}
                path="/classes"
            />
            <RouteWithLayout
                component={ClassDetailView}
                exact
                layout={MainLayout}
                path="/classes/classDetail/:id"
            />
            <RouteWithLayout
                component={AssignesView}
                exact
                layout={MainLayout}
                path="/assignes"
            />
            <RouteWithLayout
                component={PresencesView}
                exact
                layout={MainLayout}
                path="/presences"
            />
            <RouteWithLayout
                component={PresencesDetailView}
                exact
                layout={MainLayout}
                path="/presences/presencesDetail/:id"
            />
            <RouteWithLayout
                component={TypographyView}
                exact
                layout={MainLayout}
                path="/typography"
            />
            <RouteWithLayout
                component={IconsView}
                exact
                layout={MainLayout}
                path="/icons"
            />
            <RouteWithLayout
                component={AccountView}
                exact
                layout={MainLayout}
                path="/account"
            />
            <RouteWithLayout
                component={SettingsView}
                exact
                layout={MainLayout}
                path="/settings"
            />
            <RouteWithLayout
                component={SignInView}
                exact
                layout={MinimalLayout}
                path="/sign-in"
            />
            <RouteWithLayout
                component={InternalServerErrorView}
                exact
                layout={MinimalLayout}
                path="/internal-server-error"
            />
            <RouteWithLayout
                component={NotFoundView}
                exact
                layout={MinimalLayout}
                path="/not-found"
            />
            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;
