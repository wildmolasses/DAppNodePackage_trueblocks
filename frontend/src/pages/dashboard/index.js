import React from 'react';
import Page from '../../components/page';
import DashboardInner from './inner';
import { dispatcher_Dashboard, dashboard_menu } from './dispatchers';

//----------------------------------------------------------------------
class Dashboard extends React.Component {
  getInner = () => {
    var params = this.props.match.params.query ? this.props.match.params.query.replace('-', '/') : '';
    return <DashboardInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Dashboard;
export { dispatcher_Dashboard, dashboard_menu };