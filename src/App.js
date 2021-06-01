import React, { useState, useEffect } from "react";
import Choropleth from "react-leaflet-choropleth";
import { Map } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const style = {
  fillColor: "#F28F3B",
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.5,
};

const ChoroplethMap = ({ geojson }) => {

  const distNames = geojson["features"].map((dist) => dist.properties.localname)
  console.log(distNames)

  return (
    <Map style={{ height: "100vh" }} zoom={10} center={[10.817396238910442, 106.69106344134427]}>
      <Choropleth
        data={geojson}
        valueProperty={(feature) => feature.properties.localname}
        scale={['#b3cde0', '#011f4b']}
        steps={7}
        mode='e'
        style={style}
        onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.localname)}
      />
    </Map>
  );
};

const Covid19 = () => {
  const [districts, setDistricts] = useState();
  const getData = () => {
    fetch("districts.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setDistricts(myJson);
      });
  };

  useEffect(getData, []);

  return <div>{districts && <ChoroplethMap geojson={districts} />}</div>;
};

export default Covid19;
