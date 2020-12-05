/**
 * Função que retorna uma promise que demora {time} em milissegundos para resolver.
 * @param {number} time O tempo em milissegundos
 * @returns {Promise}
 */
function sleep(time = 1000): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

export default sleep;
