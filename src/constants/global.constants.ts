export const MATRIX_SIZE = 17;

export const BORDER_WIDTH = 10; // 2px for external white border, 8px for current color border

export const OFFSET = MATRIX_SIZE * MATRIX_SIZE / 2;

export const CENTRAL_INDEX = Math.floor(MATRIX_SIZE / 2);

export const INITIAL_COLORS = Array(MATRIX_SIZE).fill('#000000').map(() => Array(MATRIX_SIZE).fill('#000000'));