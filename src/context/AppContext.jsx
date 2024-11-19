import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
//import testData from '../data/test_data.json';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});

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
  
  useEffect(() => {  
    if (Object.keys(graphData).length === 0){
      setIsDataLoading(true)
    }
  }, [])


  const getFiscalData = () => {
    // TODO: Replace this with functionality to retrieve the data from the fiscalSummary endpoint
    //const fiscalDataRes = testData;
    const fiscalDataRes = axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary')
      .then(res => res.data)
    return fiscalDataRes;
  };

  const getCitizenshipResults = async () => {
    // TODO: Replace this with functionality to retrieve the data from the citizenshipSummary endpoint
    const citizenshipRes = await axios.get('https://hrf-asylum-be-b.herokuapp.com/cases//citizenshipSummary')
    .then(res => res.data)
    return citizenshipRes;
  };

  const updateQuery = async () => {
    setIsDataLoading(true);
  };

  const fetchData = async () => {
    // TODO: fetch all the required data and set it to the graphData state
    let data1 = await getFiscalData()
    let data2 = await getCitizenshipResults()
    setGraphData({...data1, "citizenshipResults": [...data2]})
    setIsDataLoading(false)
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
