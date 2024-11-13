import { useEffect } from 'react';

import QuienesSomos from "./QuienesSomos";
import Objetivos from "./Objetivos";

function Nosotros() {
    useEffect(() => {
        window.scrollTo(0, 0); // Desplaza la ventana al inicio cuando el componente se monta
    }, []);

    return(
        <>
            <Objetivos />
            <QuienesSomos />
        </>
    )
}

export default Nosotros;
