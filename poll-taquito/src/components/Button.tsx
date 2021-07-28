import React from 'react';
import '../assets/styles/design-tokens.css';
import './button.css';

export const Button = ({...props}) => {
  return (
    <a
      className={ `button ${ props.disabled && 'disabled'}` }
    >
      { props.children || 'Label' }
    </a>
  );
};
