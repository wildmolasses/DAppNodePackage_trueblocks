//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_[{PROPER}] } from './dispatchers';

import { [{MENU_TYPE}] } from '../../components';
[{NO_ERROR}]import { isError, NotReady, isEmpty, EmptyQuery } from '../../components';
[{NO_DATA}]import { isReady } from '../../components';
[{NO_DT}]import { DataTable } from '../../components';
[{NO_TEXT}][{TEXT_IMPORTS}]
[{NO_TEXT}][{TEXT_ACTIONS}]
import './[{LOWER}].css';


// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class [{PROPER}]Inner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subpage: props.subpage
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  // EXISTING_CODE

  componentWillMount = () => {};

  componentDidMount = () => {
    this.innerEar('change_subpage', this.props.subpage);
  };

  innerEar = (cmd, value) => {
    if (cmd === 'change_subpage') {
      // update the local state...
      this.setState({
        subpage: value
      });
      // update the global state...
      this.props.dispatcher_[{PROPER}](value);
      return;
    }

    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
[{NO_TEXT}][{TEXT_CODE}]
    [{NO_ERROR}]//if (isError(this.props)) return <NotReady {...this.props} />;
    [{NO_DATA}]//else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    [{NO_ERROR}]//else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    // EXISTING_CODE
    [{NO_DT}]//return (
    [{NO_DT}]//  <DataTable
    [{NO_DT}]//    subpage="[{LOWER}]"
    [{NO_DT}]//    fields={this.props.fieldList}
    [{NO_DT}]//    data={this.props.data}
    [{NO_DT}]//    meta={this.props.meta}
    [{NO_DT}]//    innerEar={this.innerEar}
    [{NO_DT}]//  />
    [{NO_DT}]//);
    return <div style={{ width: '98%' }}>Content of [{PROPER}] page with subpage: {this.state.subpage}</div>;
  };

  getInnerPage = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <[{MENU_TYPE}] data={this.props.menu} active={this.state.subpage} [{MENU_CLICK}] />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    return (
      <Fragment>
        <div className="inner-panel">
          <div className="title inner-page">[{PROPER}]</div>
          {this.getInnerPage()}
        </div>
      </Fragment>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Status, reducer_[{PROPER}] }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Status.isConnected,
  sysError: reducer_Status.error,
  isLoading: reducer_[{PROPER}].isLoading,
  error: reducer_[{PROPER}].error,
  data: reducer_[{PROPER}].data,
  meta: reducer_[{PROPER}].meta,
  fieldList: reducer_[{PROPER}].fieldList,
  menu: reducer_[{PROPER}].menu
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_[{PROPER}]
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)([{PROPER}]Inner);
