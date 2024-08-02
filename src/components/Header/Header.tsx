import React from 'react';
import classNames from 'classnames';
import colorPickerSource from '../../assets/icon-color-picker.svg';
import './Header.scss';

interface IHeaderProps {
  isPickerActive: boolean;
  selectedColor: string;
  onIconClick: () => void;
}

function Header({
  isPickerActive,
  selectedColor,
  onIconClick,
}: IHeaderProps) {
  return (
    <div className='color-dropper-header'>
      <button
        className={classNames('color-dropper-header__icon', { active: isPickerActive})}
        onClick={onIconClick}
      >
        <img src={colorPickerSource} alt='color picker' />
      </button>

      {selectedColor && (
        <span className='color-dropper-header__selected-color-hex'>
          {selectedColor}
        </span>
      )}

      <div className='color-dropper-header__selected-color' style={{backgroundColor: selectedColor}} />
    </div>
  );
}

export default Header;
