import { useState } from 'react';
import { getMapView, mapTypes } from './getMapView.jsx';
import { GraphButtons } from '../../common/GraphButtons.jsx';
import { Loading } from '../../common/Loading.jsx';
import { getGraphsHeader } from './getGraphsHeader.js';

  // Dev Note: importing useAppContext to manage mapview state
  
import { useAppContext } from '../../../context/AppContext.jsx';

export const GraphsPage = () => {

  //Dev Note: commented out useState hook below, now handling state in AppContext to allow 
  // mapview to persist while navigating pages
  
  //const [mapView, setMapView] = useState(mapTypes.ScatterPlot);

  const { mapView, setMapView } = useAppContext()

  return (
    <div className='secondary-c'>
      <div className='plot-main flex w-[70%] gap-10 mx-auto justify-end'>
        <div className='plot-main flex-c'>
          <h1 className='py-5'>{getGraphsHeader(mapView)}</h1>
          <section className='maps'>{getMapView(mapView)}</section>
        </div>
        <GraphButtons mapView={mapView} setMapView={setMapView} />
      </div>
      <Loading />
    </div>
  );
};
