import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { mapTypes } from '../components/pages/DataVisualizations/getMapView.jsx';

const AppContext = createContext({});

// Dev Note: added this for cleaner axios calls using interpolation

let baseURL = 'https://hrf-asylum-be-b.herokuapp.com/cases';

/**
 * TODO: Ticket 2:
 * - Use axios to fetch the data
 * - Store the data
 * - Populate the graphs with the stored data
 */

const useAppContextProvider = () => {
  const [graphData, setGraphData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [mapView, setMapView] = useState(mapTypes.ScatterPlot);

  let firstRenderCheck = useLocalStorage({ graphData, setGraphData });

  // Dev Note: I decided to use conditional logic inside the useEffect hook below to test whether
  // the returning value of useLocalStorage is undefined or not. This basically sets up
  // axios calls when landing on the page, immediately retrieving the real data,
  // bypassing any pre-rendered test data, without having to the press clear and update query buttons.
  //
  // This happens by changing isDataLoading state to true, firing off the useEffect
  // prewritten into the template below. It sets off a chain reaction
  // from isDataLoading(true) -> fetchData() -> getfiscalData() && getCitizenshipData().
  // The responses from the latter two returns data to fetchData, awaiting to
  // then restructure it, set in state, and locally store it in the browser.
  // !!!This useEffect along with the variable myAppState could be erased to bring
  // the app to match deployed example!!!

  useEffect(() => {
    if (firstRenderCheck === undefined) {
      setIsDataLoading(true);
    }
  }, []);

  // Dev Note: for the two functions getFiscalData() and getCitizenshipResults(),
  // I decided to use .then/.catch instead of asynch/await and try/catch
  // they both return responses for fetchData() function below.

  const getFiscalData = () => {
    // TODO: Replace this with functionality to retrieve the data from the fiscalSummary endpoint

    const fiscalDataRes = axios
      .get(`${baseURL}/fiscalSummary`)
      .then(res => res.data)
      .catch(err => console.log(err));
    return fiscalDataRes;
  };

  const getCitizenshipResults = () => {
    // TODO: Replace this with functionality to retrieve the data from the citizenshipSummary endpoint
    // Dev Question: would the below async/await and try/catch block be better?
    // I erased the template async term before parentheses to keep both of these axios calls to the endpoint consistent.

    // try {
    //   const citizenshipRes = await axios.get(`${baseURL}/citizenshipSummary`);
    //   return citizenshipRes.data;
    // } catch (err) {
    //   console.log(err);
    // }

    const citizenshipRes = axios
      .get('https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary')
      .then(res => res.data)
      .catch(err => console.log(err));
    return citizenshipRes;
  };

  const updateQuery = async () => {
    setIsDataLoading(true);
  };

  const fetchData = async () => {
    // TODO: fetch all the required data and set it to the graphData state

    // Dev Note: I Decided to use try/catch block to match the async declaration written into the template
    // then I await the responses from both functions' axios calls, assigning them to two variables.
    // This makes structuring an object appropriate for setting state in GraphData.
    // Then I set isDataLoading back to initial state, false.
    try {
      let data1 = await getFiscalData();
      let data2 = await getCitizenshipResults();
      setGraphData({ ...data1, citizenshipResults: [...data2] });
      setIsDataLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const clearQuery = () => {
    setGraphData({});
  };

  const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,

    //Dev Note: I'm returning these two props specifically to allow GraphsPage.jsx use them!
    mapView,
    setMapView,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
