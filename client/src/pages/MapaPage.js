import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhemFydGUiLCJhIjoiY2txMDNwMGp1MDEzeDJwczVjdWgweTk2YSJ9.UGJumYlWxXz4bvERV4-zxA';

const puntoInicial = {
    lng: -65.40667,
    lat: -24.80439,
    zoom: 12
}

export const MapaPage = () => {

    const mapaDiv = useRef();
    // const [mapa, setMapa] = useState();
    const mapa = useRef();
    const [coords, setCoords] = useState(puntoInicial);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: puntoInicial.zoom
        });

        // setMapa(map);
        mapa.current = map;
    },[]);

    useEffect(() => {
        
        mapa.current?.on('move', () => {
            const {lng, lat} = mapa.current.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat : lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2)
            })
        })

        return mapa.current?.off('move');

    },[])

    return (
        <>
            <div className="info">
                longitud: {coords.lng} | latitud: {coords.lat} | zoom: {coords.zoom}
            </div>
            <div
                ref={mapaDiv}
                className="mapContainer"
            />
        </>
    )
}
