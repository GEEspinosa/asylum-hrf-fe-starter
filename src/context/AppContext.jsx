import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

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

  useLocalStorage({ graphData, setGraphData });

  // Dev Note: assigned key from local storage to myAppState

  let myAppState = localStorage.getItem('myAppState');


  // Dev Note: I decided to use conditional to test whether local storage has the data blob
  // or not on first render to immediately load the data without having to press query button.
  // When storage is "empty," it happens to have a length of 2.
  // I got this length by logging Object.keys(myAppState).length.
  // Then I decided to trigger a useEffect prewritten into the template below by making
  // setting isDataLoading to true. It sets off a chain reaction
  // from isDataLoading(true) -> fetchData() -> getfiscalData() && getCitizenshipData().
  // The responses from the latter two returns data to fetchData, awaiting to
  // then restructure it, set in state, and locally stored in the browser.
  // !!!This useEffect along with the variable myAppState could be erased to bring 
  //the app to match deployed example!!!

  useEffect(() => {
    if (Object.keys(myAppState).length <= 2) {
      setIsDataLoading(true);
    }
  }, []);

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

    // Dev Note: I Decided to use try/catch block to match async from template
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
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
