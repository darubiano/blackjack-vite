import _ from 'underscore';

/**
 * Esta funcion crea un nuevo deck
 * @param {Array<String>} tipos_carta ejemplo: ['C', 'D', 'H', 'S']
 * @param {Array<String>} tipos_especiales ejemplo: ['A', 'J', 'Q', 'K']
 * @returns {Array<String>} retorna un nuevo deck de cartas barajadas
 */
export const crearDeck = (tipos_carta, tipos_especiales) => {
    if (!tipos_carta || tipos_carta.length === 0) throw new Error('Tipos de carta es obligatorio de string');
    let deck = [];
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos_carta) {
            deck.push(i + tipo);
        }
    }
    for (let tipo of tipos_carta) {
        for (let especial of tipos_especiales) {
            deck.push(especial + tipo);
        }
    }
    return _.shuffle(deck);
};

// export default crearDeck;