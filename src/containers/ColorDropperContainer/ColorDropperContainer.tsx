import React from 'react';
import sourceImage from '../../assets/source-image.jpg';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import Header from '../../components/Header/Header';
import { useColorDropperData } from '../../hooks/useColorDropperData';

function ColorDropperContainer(): JSX.Element {
    const {
        isEnabled,
        isVisible,
        position,
        colors,
        currentColor,
        selectedColor,
        canvasRef,
        sourceImageRef,
        onPickerIconClick,
        onSourceImageLoad,
    } = useColorDropperData();

    return (
        <div>
            <Header
                isPickerActive={isEnabled}
                selectedColor={selectedColor}
                onIconClick={onPickerIconClick}
            />

            <div>
                <img
                    alt='source'
                    src={sourceImage}
                    style={{ display: 'none' }}
                    ref={sourceImageRef}
                    onLoad={onSourceImageLoad}
                />
                <canvas ref={canvasRef} />
            </div>

            {isEnabled && isVisible && (
                <ColorPicker
                    position={position}
                    colors={colors}
                    currentColor={currentColor}
                />
            )}
        </div>
    );
}

export default ColorDropperContainer;
