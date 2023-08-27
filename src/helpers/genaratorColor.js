function componentToHex(componente) {
    var hex = componente.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

export const gerarCorAutomatica = () => {
    // Gerar valores aleatórios para os componentes RGB
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // Formatar a cor no formato hexadecimal
    var corHexadecimal = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);

    return corHexadecimal;
};
