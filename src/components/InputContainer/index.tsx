import React from 'react';

import classes from './InputContainer.module.scss';

interface InputContainerProps {
  title?: string;
  styles?: React.CSSProperties;
  columns?: number;
}

const InputContainer: React.FC<InputContainerProps> = (props) => {
  const { title, children, styles, columns = 1 } = props;
  let gridTemplateColumns = '355px';
  if (columns === 1) {
    gridTemplateColumns = '355px';
  }
  if (columns === 2) {
    gridTemplateColumns = '355px 355px';
  }
  if (columns === 3) {
    gridTemplateColumns = '355px 355px 355px';
  }

  return (
    <div className={classes.inputContainer}>
      <h5 className={classes.inputContainer_title}>{title}</h5>
      <div
        className={classes.inputContainer_box}
        style={{ gridTemplateColumns: gridTemplateColumns, ...styles }}
      >
        {children}
      </div>
    </div>
  );
};
export default InputContainer;
