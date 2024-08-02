import { CENTRAL_INDEX, MATRIX_SIZE } from "../constants/global.constants";

export const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

export const listToMatrix = (arr: Uint8ClampedArray, elementsPerSubArray: number): number[][] => {
    const matrix: number[][] = [];

    for (let i = 0, k = -1; i < arr.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(arr[i]);
    }

    return matrix;
}

export const getColorsMatrix = (arr: number[][], x: number, y: number, widthRatio: number, heightRatio: number): string[][] => {
    const newColors: string[][] = [];
    for (let i = -MATRIX_SIZE / 2; i <= MATRIX_SIZE / 2; i++) {
        const colorsLine = [];
        for (let j = -MATRIX_SIZE / 2; j <= MATRIX_SIZE / 2; j++) {
            const rowPixels = arr[Math.floor((y + i) * heightRatio)];
            const index = Math.floor((x + j) * widthRatio) * 4;
            const r = rowPixels?.[index] || 0;
            const g = rowPixels?.[index + 1] || 0;
            const b = rowPixels?.[index + 2] || 0;
            const hex = `#${(`000000${rgbToHex(r, g, b)}`).slice(-6)}`;

            colorsLine.push(hex);
        }
        newColors.push(colorsLine);
    }

    return newColors;
};

export const isCentralCell = (x: number, y: number): boolean => x === CENTRAL_INDEX && y === CENTRAL_INDEX;