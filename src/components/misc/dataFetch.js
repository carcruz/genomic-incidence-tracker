import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getAvailableVariables, getGeoJsons } from "../../actions/fetchData";

const DataFetch = (fetchFunctions) => {
  useEffect(() => {
    for (const key of Object.keys(fetchFunctions)) {
      fetchFunctions[key]();
    }
  }, [fetchFunctions]); /* could also use [] as props _should_ never change */
  return null;
};

DataFetch.propTypes = {
  getAvailableVariables: PropTypes.func.isRequired,
  getGeoJsons: PropTypes.func.isRequired
};

const mapDispatchToProps = { // https://react-redux.js.org/using-react-redux/connect-mapdispatch
  getAvailableVariables,
  getGeoJsons
};

export default connect(null, mapDispatchToProps)(DataFetch);
