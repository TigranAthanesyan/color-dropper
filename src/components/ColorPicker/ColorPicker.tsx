import React from 'react';
import classNames from 'classnames';
import { isCentralCell } from '../../utils/helpers'
import { IPosition } from '../../interfaces/global.interfaces';
import { MATRIX_SIZE } from '../../constants/global.constants';
import './ColorPicker.scss';

interface IColorPickerProps {
    position: IPosition;
    colors: string[][];
    currentColor: string;
}

function ColorPicker({
    position,
    colors,
    currentColor,
}: IColorPickerProps) {
    return (
        <div
            className='color-picker'
            style={position}
        >
            <div
                className='color-picker__matrix'
                style={{ borderColor: currentColor }}
            >
                {Array(MATRIX_SIZE).fill(0).map((_, rowIndex) => (
                    <div key={rowIndex} className='color-picker__matrix__row'>
                        {Array(MATRIX_SIZE).fill(0).map((_, itemIndex) => {
                            const isCurrentCell = isCentralCell(itemIndex, rowIndex);
                            return (
                                <div
                                    key={itemIndex}
                                    className={classNames('color-picker__cell', { current: isCurrentCell})}
                                    style={{
                                        background: colors[rowIndex][itemIndex],
                                    }}
                                />
                            );
                        })}
                    </div>
                ))}

                <div className='color-picker__code'>
                    {currentColor?.toUpperCase()}
                </div>
            </div>
        </div>
    );
}

export default ColorPicker;