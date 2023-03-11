import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function MapboxMap(props) {
  const listId = props.listId
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'listings', listId);
      const docSnap = await getDoc(docRef);
      // if (docSnap.exists()) {
      //   console.log(docSnap.data());
      // } else {
      //   console.log('No such document!');
      // }
      const docData = docSnap.data();

      setLat(docData.geolocation.lat);
      setLng(docData.geolocation.lng);

    //   if (!map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
        fadeDuration: 0,
        renderWorldCopies: false,
        dragRotate: false,
        scrollZoom: false
      });

      //adding zoom-in/zoom-out & compass controls: 
      // map.current.addControl(new mapboxgl.NavigationControl());

      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 30 }).setHTML(`<p>${docData.location}</p>`)
        )
        .addTo(map.current);
    };

    fetchData();
  }, [listId, lat, lng, zoom]);

  return (
    <>
      <div className='sidebar'>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className='map-container' />
    </>
  );
}

export default MapboxMap;
