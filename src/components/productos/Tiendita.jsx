import { useEffect } from 'react';

import Tienda from './Tienda';
import Suscribete from '../home/Suscribete';
import ScrollingText from './ScrollingText';

function Tiendita() {
    useEffect(() => {
        window.scrollTo(0, 0); // Desplaza la ventana al inicio cuando el componente se monta
    }, []);

    return (
        <>
            <ScrollingText />
            <Tienda />
            <Suscribete />
        </>
    )
}

export default Tiendita;
