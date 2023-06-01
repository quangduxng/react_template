import React from "react"
import { Redirect } from "react-router-dom"

// Layout Types
import { AuthLayout, BaseLayout } from "./layouts"
// Route Views
import WorkspaceDetails from "./views/WorkspaceDetails/WorkspaceDetails"
import Users from "./views/Users/Users"
import Profile from "./views/Profile/Profile"
import Workspaces from "./views/Workspaces/Workspaces"
import Login from "./views/Login/Login"
import { SCREEN_NAME } from "./constants/screens"
import UserDetail from "./views/UserDetail/UserDetail"
import ResetPassword from './views/ResetPassword/Login';
import InputOTP from './views/InputOTP/InputOTP';
import TrialSaas from "./views/TrialSaas/TrialSaas"
import LoginByEmail from "./views/LoginByEmail/LoginByEmail"
import EnterCode from "./views/LoginByEmail/EnterCode"
import ChangePassword from "./views/ChangePassword/ChangePassword"
import Invoices from './views/Invoices/Invoices';
import NewWorkspaceWithToken from "./views/Dashboard-with-token/new-workspace/NewWorkspaceWithToken"
import DashboardView from "./views/Dashboard-with-token/view-dashboard/DashboardView"
import BaseLayoutWithToken from "./layouts/BaseLayoutWithToken"
import Logout from "./views/Logout"

var routes = [
   {
      path: "/",
      exact: true,
      layout: BaseLayout,
      component: () => <Redirect to="/workspaces" />,
   },
   {
      path: SCREEN_NAME.WORKSPACES,
      exact: true,
      layout: BaseLayout,
      component: Workspaces,
   },
   {
      path: SCREEN_NAME.BASE_DASHBOARD_NEW_WORKSPACE,
      exact: true,
      layout: BaseLayoutWithToken,
      component:NewWorkspaceWithToken ,
   },
   {
      path: SCREEN_NAME.BASE_DASHBOARD_VIEW,
      exact: true,
      layout: BaseLayoutWithToken,
      component:DashboardView ,
   },
   {
      path: SCREEN_NAME.USERS,
      exact: true,
      layout: BaseLayout,
      component: Users,
   },
   {
      path: SCREEN_NAME.LOGIN,
      exact: true,
      layout: AuthLayout,
      component: Login,
   },
   {
      path: SCREEN_NAME.LOGIN_BY_EMAIL,
      exact: true,
      layout: AuthLayout,
      component: LoginByEmail,
   },
   {
      path: SCREEN_NAME.VERIFY_EMAIL,
      exact: true,
      layout: AuthLayout,
      component: EnterCode,
   },
   {
      path: SCREEN_NAME.FORGOT_PASSWORD,
      exact: true,
      layout: AuthLayout,
      component: ResetPassword,
   },
   {
      path: SCREEN_NAME.INPUT_OTP,
      exact: true,
      layout: AuthLayout,
      component: InputOTP,
   },
   {
      path: SCREEN_NAME.CHANGE_PASSWORD,
      exact: true,
      layout: BaseLayout,
      component: ChangePassword,
   },
   {
      path: SCREEN_NAME.PROFILE,
      exact: true,
      layout: BaseLayout,
      component: Profile,
   },
   {
      path: SCREEN_NAME.WORKSPACE_DETAILS_ID,
      exact: true,
      layout: BaseLayout,
      component: WorkspaceDetails,
   },
   {
      path: SCREEN_NAME.USER_DETAIL_ID,
      exact: true,
      layout: BaseLayout,
      component: UserDetail,
   },
   {
      path: SCREEN_NAME.INVOICES,
      exact: true,
      layout: BaseLayout,
      component: Invoices,
   },
   {
      path: SCREEN_NAME.LOGOUT,
      exact: true,
      layout: BaseLayout,
      component: Logout,
   },
   // {
   //   path: "/dashio-admin",
   //   exact: true,
   //   layout: BaseLayout,
   //   component: () => <Redirect to="/dashio-admin/dashboard" />,
   // },
   // {
   //    path: SCREEN_NAME.REGISTER_SAAS,
   //    exact: true,
   //    layout: UnauthenLayout,
   //    component: RegisterSaas,
   // },
   // {
   //    path: SCREEN_NAME.SUCCESS_REGISTER_SAAS,
   //    exact: true,
   //    layout: UnauthenLayout,
   //    component: SuccessRegisterSaas,
   // },
   {
      path: SCREEN_NAME.TRIAL_SAAS,
      exact: true,
      layout: BaseLayoutWithToken,
      component: TrialSaas,
   },
   // {
   //    path: SCREEN_NAME.WORKSPACE_SETTINGS,
   //    exact: true,
   //    layout: BaseLayout,
   //    component: WorkspaceSettings,
   // },
   // {
   //   path: "/dashio-admin/dashboard",
   //   layout: BaseLayout,
   //   component: Dashboard,
   // },

   // {
   //   path: "/dashio-admin/components/buttons",
   //   layout: BaseLayout,
   //   component: Buttons,
   // },

   // {
   //   path: "/dashio-admin/components/badge",
   //   layout: BaseLayout,
   //   component: Badge,
   // },

   // {
   //   path: "/dashio-admin/components/card",
   //   layout: BaseLayout,
   //   component: Card,
   // },
   // {
   //   path: "/dashio-admin/components/alert",
   //   layout: BaseLayout,
   //   component: Alert,
   // },
   // {
   //   path: "/dashio-admin/components/progressbar",
   //   layout: BaseLayout,
   //   component: ProgressBar,
   // },
   // {
   //   path: "/dashio-admin/components/loader",
   //   layout: BaseLayout,
   //   component: Loader,
   // },

   // {
   //   path: "/dashio-admin/ui-elements",
   //   layout: BaseLayout,
   //   component: UIElements,
   // },
   // {
   //   path: "/dashio-admin/widgets",
   //   layout: BaseLayout,
   //   component: Widgets,
   // },
   // {
   //   path: "/dashio-admin/forms",
   //   layout: BaseLayout,
   //   component: Forms,
   // },
   // {
   //   path: "/dashio-admin/tables",
   //   layout: BaseLayout,
   //   component: Tables,
   // },
   // {
   //   path: "/dashio-admin/pages",
   //   layout: BaseLayout,
   //   component: Pages,
   // },

   // {
   //   path: "/dashio-admin/charts",
   //   layout: BaseLayout,
   //   component: Charts,
   // },
]

export default routes
