import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid';

export const useMapbox = (puntoInicial) => {

    mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhemFydGUiLCJhIjoiY2txMDNwMGp1MDEzeDJwczVjdWgweTk2YSJ9.UGJumYlWxXz4bvERV4-zxA';

    const mapaDiv = useRef();
    const setRef = useCallback((node) => {
        mapaDiv.current = node;
    }, [])

    const marcadores = useRef({});

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
    }, [puntoInicial.lng, puntoInicial.lat, puntoInicial.zoom]);

    useEffect(() => {

        mapa.current?.on('move', () => {
            const { lng, lat } = mapa.current.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2)
            })
        })

        return mapa.current?.off('move');

    }, [])

    useEffect(() => {

        mapa.current?.on('click', (ev) => {

            const { lng, lat } = ev.lngLat;
            const marker = new mapboxgl.Marker();
            marker.id = v4();
            marker
                .setLngLat([lng, lat])
                .addTo(mapa.current)
                .setDraggable(true);
            
            marcadores.current[marker.id] = marker;
        })

        return () => {
            mapa.current?.off('click');
        }
    }, [])

    return {
        coords,
        setRef,
        marcadores
    }
}