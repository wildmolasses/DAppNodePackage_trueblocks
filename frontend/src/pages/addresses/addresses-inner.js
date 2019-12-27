//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Addresses } from './addresses-getdata';

import { InnerPageHeader, DetailTable } from '../../components';
import { LocalMenu } from '../../components/local-menu';
import { Loading } from '../../components/loading';
import { addresses_local_menu } from '../../fake_data/summary-data';
import './addresses.css';

// EXISTING_CODE
import '../../components/detail-table.css';
import { your_names } from '../../fake_data/detail-data-your-names.js';
import { tokens } from '../../fake_data/detail-data-tokens.js';
import { shared } from '../../fake_data/detail-data-shared.js';
import { dispatcher_MonitorRemove } from './addresses-getdata-remove';
import { dispatcher_AddressAdd, AddNewAddress } from './addresses-getdata-add';
import DetailPopup from '../../components/detail-popup';
import DataTable from '../../components/data-table';
const headings = ['', 'Name', 'First', 'Last', 'Range', 'Count', 'Interval', 'Bytes', 'Balance', ''];
// EXISTING_CODE

//----------------------------------------------------------------------
class AddressesInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // EXISTING_CODE
      showPopup: false,
      selectedRow: '',
      data: your_names,
      // EXISTING_CODE
      subpage: props.subpage
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  closePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  componentDidMount = () => {
    this.props.monitorDispatch();
  };
  // EXISTING_CODE

  innerEar = (cmd, value) => {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');

    // EXISTING_CODE
    var data = your_names;
    switch (value) {
      case 'addresses/known':
        data = tokens;
        break;
      case 'addresses/community':
        data = shared;
        break;
      default:
        data = your_names;
        break;
    }
    // EXISTING_CODE

    if (cmd === 'change_subpage') {
      this.setState({
        // EXISTING_CODE
        data: data,
        showPopup: false,
        selectedRow: {},
        // EXISTING_CODE
        subpage: value
      });
    } else if (cmd === 'goto_page') {
      window.open('/' + value, '_self');
    }
    // EXISTING_CODE
    if (cmd === 'remove') {
      this.props.removeAddressDispatch(value, true);
    } else if (cmd === 'delete' || cmd === 'undo') {
      this.props.removeAddressDispatch(value, false);
    } else if (cmd === 'expand') {
      if (value === this.state.selectedRow) {
        this.setState({
          data: data,
          showPopup: false,
          selectedRow: {},
          subpage: value
        });
      } else {
        this.setState({
          data: data,
          showPopup: true,
          selectedRow: value,
          subpage: value
        });
      }
    } else if (cmd === 'monitor') {
      this.props.addAddressMonitor(value);
    }
    // EXISTING_CODE
  };

  // EXISTING_CODE
  getInner1 = () => {
    if (this.state.subpage === 'addresses/monitors') {
      return <Fragment></Fragment>;
    }

    if (this.state.showPopup) {
      return (
        <Fragment>
          <DetailTable css_pre="addresses" data={this.state.data} innerEar={this.innerEar} />
          <DetailPopup closePopup={this.closePopup.bind(this)} item={this.state.selectedRow} innerEar={this.innerEar} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <DetailTable css_pre="addresses" data={this.state.data} innerEar={this.innerEar} />
      </Fragment>
    );
  };

  getInner2 = () => {
    if (this.state.subpage !== 'addresses/monitors') {
      return <Fragment></Fragment>;
    }

    return (
      <Fragment>
        <AddNewAddress {...this.props} />
        <div className="data-table">
          <DataTable headings={headings} rows={this.props.monitorStatus.items} innerEar={this.innerEar} />
        </div>
      </Fragment>
    );
  };
  // EXISTING_CODE

  getInner = () => {
    let inner;
    // EXISTING_CODE
    inner = <Fragment>{this.state.subpage !== 'addresses/monitors' ? this.getInner1() : this.getInner2()}</Fragment>;
    // EXISTING_CODE
    return inner;
  };

  getContainer = () => {
    // EXISTING_CODE
    if (this.props.error) {
      return <Loading source="addresses" status="error" message={this.props.error} />;
    } else if (!this.props.isConnected || !this.props.monitorStatus || !this.props.monitorStatus.items) {
      return <Loading source="addresses" status="initializing" message="Loading..." />;
    }
    // EXISTING_CODE
    let container;
    if (this.props.error) {
      container = <Loading source="addresses" status="error" message={this.props.error} />;
    } else if (this.props.isConnected) {
      container = (
        <div className="inner-panel">
          <LocalMenu data={addresses_local_menu} active={this.state.subpage} innerEar={this.innerEar} />
          {this.getInner()}
        </div>
      );
    } else {
      container = <Loading source="addresses" status="initializing" message="Loading..." />;
    }
    return container;
  };

  render = () => {
    return (
      <div className="right-panel">
        <InnerPageHeader
          title="Addresses"
          notes="Monitors are per-address index caches that enable fast reteival of transaction histories for any account. Note that the transactions/logs/receipts/traces are not downloaded until you explore an address."
        />
        {this.getContainer()}
      </div>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Connection, reducer_Addresses }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error,
  monitorStatus: reducer_Addresses.monitorStatus
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      monitorDispatch: () => dispatcher_Addresses(),
      removeAddressDispatch: (address, remove) => dispatcher_MonitorRemove(address, remove),
      addAddressMonitor: (address) => dispatcher_AddressAdd(address),
      // EXISTING_CODE
      dispatcher_Addresses
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressesInner);
