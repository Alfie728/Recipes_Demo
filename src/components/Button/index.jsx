import { classNameStyled } from '@/utils';
import styles from './index.module.scss';
import React from 'react';

const Button = (props) => {
  const { className, ...rest } = props;

  const btnClassNames = classNameStyled(className, styles, 'btn btn-primary');
  return <span className={btnClassNames} {...rest} />;
};

export default Button;
