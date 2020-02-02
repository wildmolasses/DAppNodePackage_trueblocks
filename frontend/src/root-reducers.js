import { combineReducers } from 'redux';

//------------------------------------------------------------------------
import reducer_Status from './components/StatusPanel/reducers';
import reducer_SidePanels from './components/SidePanel/reducers';
import reducer_LastLocation from './last-location-actions';
import reducer_MainMenu from './components/MainMenu/reducers';
import reducer_Dashboard from './pages/dashboard/reducers';
import reducer_Addresses from './pages/addresses/reducers';
import reducer_Explore from './pages/explore/reducers';
import reducer_Digests from './pages/digests/reducers';
import reducer_Signatures from './pages/signatures/reducers';
import reducer_Caches from './pages/caches/reducers';
import reducer_Other from './pages/other/reducers';
import reducer_Settings from './pages/settings/reducers';
import reducer_Support from './pages/support/reducers';

//------------------------------------------------------------------------
export default combineReducers({
  reducer_Status,
  reducer_SidePanels,
  reducer_LastLocation,
  reducer_MainMenu,
  reducer_Dashboard,
  reducer_Addresses,
  reducer_Explore,
  reducer_Digests,
  reducer_Signatures,
  reducer_Caches,
  reducer_Other,
  reducer_Settings,
  reducer_Support
});
