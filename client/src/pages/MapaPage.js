import React, { useEffect }  from 'react';
import { useMapbox } from '../hooks/useMapbox';

const puntoInicial = {
    lng: -65.40667,
    lat: -24.80439,
    zoom: 12
}

export const MapaPage = () => {

    const { coords, setRef, nuevoMarcador$, movimientoMarcador$ } = useMapbox(puntoInicial);

    useEffect(() => {
       nuevoMarcador$.subscribe( marcador => {
           console.log(marcador);
       })
    }, [nuevoMarcador$])

    useEffect(() => {
        movimientoMarcador$.subscribe(marcador => {
            console.log(marcador);
        })
    }, [movimientoMarcador$])

    return (
        <>
            <div className="info">
                longitud: {coords.lng} | latitud: {coords.lat} | zoom: {coords.zoom}
            </div>
            <div
                ref={setRef}
                className="mapContainer"
            />
        </>
    )
}
