import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Caches } from './caches-getdata';

import Loading from '../components/loading';
import InnerHeader from '../components/inner-header';
import { SummaryTable } from '../components/summary-table';
import { summary_caches_data } from '../fake_data/summary-data';

const CachesInner = (props) => {
  let status;
  if (props.isLoading) {
    status = 'loading';
  }

  if (props.error) {
    status = 'error';
  } else if (!props.isConnected) {
    status = 'initializing';
  } else {
    status = 'ready';
  }

  function innerEar(cmd, value) {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');
    if (cmd === 'change_page') {
      // this.setState(this.state);
      window.open('/' + value.replace('/', '?sub='), '_self');
    }
  }

  let container;
  switch (status) {
    case 'ready':
      container = (
        <div className="inner-panel">
          <SummaryTable data={summary_caches_data} no_labels innerEar={innerEar} />
          <h4>Caches Group 1</h4>
          <ul>
            <li>Item 1 1</li>
            <li>Item 1 2</li>
          </ul>
          <h4>Caches Group 2</h4>
          <ul>
            <li>Item 2 1</li>
            <li>Item 2 2</li>
          </ul>
        </div>
      );
      break;
    case 'initializing':
      container = <Loading status={status} message="Initializing..." />;
      break;
    case 'error':
      container = <Loading status={status} message={props.error} />;
      break;
    default:
      container = <Loading status={status} message="Loading..." />;
  }
  return (
    <div className="right-panel">
      <div>
        <InnerHeader
          title="Caches"
          notes="TrueBlocks Caches greatly speed up access to the Ethereum data; however, they take up a lot of space on your 
          hard drive, so you have to keep any eye on them. Clean them out periodically so they don't get too big."
        />
        {container}
      </div>
    </div>
  );
};

const mapStateToProps = ({ reducer_Connection, reducer_Caches }) => ({
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Caches
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CachesInner);
