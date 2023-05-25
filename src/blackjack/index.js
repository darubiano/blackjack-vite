import { crearDeck, pedirCarta, valorCarta } from "./usecases/index";
/**
 * PATRON MODULO
 * Compirmir codigo
 * https://www.toptal.com/developers/javascript-minifier
 */
// Funcion anonima auto invocada
const miModulo = (() => {
    // USO estricto
    'use strict';
    /**
     * 2C = Two of Clubs
     * 2D = Two of Dimonds
     * 2S = Two of Spades
     * 2H = Two of Heart
     */
    let deck = [];
    let puntos_jugadores = [];
    const tipos = ['C', 'D', 'H', 'S'], especiales = ['A', 'J', 'Q', 'K'];
    // 
    const btn_pedir = document.querySelector('#btn_pedir'),
        btn_detener = document.querySelector('#btn_detener'),
        btn_nuevo = document.querySelector('#btn_nuevo');
    // 
    const puntos_html = document.querySelectorAll('small'),
        div_cartas_jugadores = document.querySelectorAll('.divCartas');
    //
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck(tipos, especiales);
        puntos_jugadores = [];
        for (let index = 0; index < numJugadores; index++) {
            puntos_jugadores.push(0);
        }
        puntos_html.forEach(elem => elem.innerText = 0);
        div_cartas_jugadores.forEach(elem => elem.innerHTML = '');
        btn_detener.disabled = false;
        btn_pedir.disabled = false;
    };


    // Turno: 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) => {
        puntos_jugadores[turno] = puntos_jugadores[turno] + valorCarta(carta);
        puntos_html[turno].innerText = puntos_jugadores[turno];
        return puntos_jugadores[turno];
    };

    const crearCarta = (carta, turno) => {
        // insertar carta
        const img_carta = document.createElement('img');
        img_carta.src = `assets/cartas/${carta}.png`;
        img_carta.classList.add('carta');
        div_cartas_jugadores[turno].append(img_carta);
    };

    const determinarGanador = () => {
        const [puntos_minimos, puntos_computador] = puntos_jugadores;
        setTimeout(() => {
            if (puntos_minimos === puntos_computador) {
                alert('Nadie Gana Empate');
            } else if (puntos_minimos > 21) {
                alert('Gana la computadora');
            } else if (puntos_computador > 21) {
                alert('Gana el jugador');
            } else {
                alert('Gana la computadora');
            }
        }, 10);
    };

    // Turno de computadora
    const turnoComputadora = (puntos_minimos) => {
        let puntos_computador = 0;
        do {
            const carta = pedirCarta(deck);
            puntos_computador = acumularPuntos(carta, puntos_jugadores.length - 1);
            crearCarta(carta, puntos_jugadores.length - 1);
        } while ((puntos_computador < puntos_minimos));
        determinarGanador();
    };

    // EVENTOS
    btn_pedir.addEventListener('click', () => {
        const carta = pedirCarta(deck);
        const puntos_jugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);
        // Puntos jugador
        if (puntos_jugador > 21) {
            btn_pedir.disabled = true;
            btn_detener.disabled = true;
            turnoComputadora(puntos_jugador);
        } else if (puntos_jugador === 21) {
            btn_pedir.disabled = true;
            btn_detener.disabled = true;
            alert('Gana el jugador');
        }
    });
    // 
    btn_detener.addEventListener('click', () => {
        btn_pedir.disabled = true;
        btn_detener.disabled = true;
        turnoComputadora(puntos_jugadores[0]);
    });
    // 
    btn_nuevo.addEventListener('click', () => {
        inicializarJuego();
    });
    // Retornar un valor publico
    return {
        nuevoJuego: inicializarJuego
    };
})();
