import { combineReducers } from 'redux';

//------------------------------------------------------------------------
import reducer_Status from './components/panels/status-actions';
import reducer_SidePanels from './components/panels/side-panel-actions';
[{IMPORTS}]
//------------------------------------------------------------------------
export default combineReducers({
  reducer_Status,
  reducer_SidePanels,
[{REDUCERS}]
});
