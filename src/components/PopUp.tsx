import React from 'react';
import style from '../styles/PopUp.module.css'

interface ComponentProps {
    children: React.ReactNode;
  }

function PopUp({ children }: ComponentProps) {
    return (
        <div className={style.popupWrapper}>
            <div className={style.popup}>
                <div className={style.popupContent}>{children}</div>
            </div>      
        </div>
    );
}

export default PopUp;