export class ColorsHandler {

    static isReadableForBlackBackground(rgbString) {
        // Extraer los valores RGB del string
        const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
        const match = rgbRegex.exec(rgbString);
    
        if (!match) {
            throw new Error('Formato RGB inválido');
        }
    
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
    
        // Calcular la luminosidad relativa
        const luminance = (channel) => {
            const value = channel / 255;
            return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
        };
    
        const L = 0.2126 * luminance(r) + 0.7152 * luminance(g) + 0.0722 * luminance(b);
    
        // Calcular el contraste con el color negro
        const blackLuminance = 0; // Luminosidad relativa del negro es 0
        const contrastRatio = (L + 0.05) / (blackLuminance + 0.05);
    
        // Un contraste de 4.5:1 es generalmente considerado adecuado para texto normal
        return contrastRatio > 4.5;
    }    
}