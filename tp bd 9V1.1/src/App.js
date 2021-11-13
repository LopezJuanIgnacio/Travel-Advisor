import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import * as data from './Data/datosTerminado.json';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [places, setPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);
  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      setPlaces(data.Restaurantes);
      setIsLoading(false);
    }
  }, [bounds]);
  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };
  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={places}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={places}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default App;
