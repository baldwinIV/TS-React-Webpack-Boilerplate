import React from 'react';
import style from './TestComponent.module.scss';
export function TestComponent() {
  return (
    <div className={style.wrapper}>
      image test
      <div className={style.imageContainer}></div>
    </div>
  );
}
