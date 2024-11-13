import { useEffect } from 'react';

import MainBanner from "../../common/MainBanner";
import CarruselProductos from './CarruselProductos';
import Previa from "./Previa";
import Suscribete from  "./Suscribete";

function Inicio() {
    useEffect(() => {
        window.scrollTo(0, 0); // Desplaza la ventana al inicio cuando el componente se monta
    }, []);

    return (
        <>            
            <MainBanner />
            <CarruselProductos />
            <Previa />
            <Suscribete/>
        </>
    )
}

export default Inicio;
