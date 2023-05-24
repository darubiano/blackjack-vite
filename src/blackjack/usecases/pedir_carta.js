/**
 * Esta funcion me permite tomar una carta
 * @param {Array<String>} deck 
 * @returns {String} Elimina una carta del deck
 */
export const pedirCarta = (deck) => {
    if (deck.length === 0) throw Error('No hay mas cartas');
    return deck.pop();
};