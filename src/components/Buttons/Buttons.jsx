import React from "react";
import styles from './buttons.module.scss'

export const AffiliateModalWhiteButton = (props) => {
  return (
    <button className={styles.affiliate__btn_white} { ...props }>
        {props.children}
    </button>
  )
};

export const AffiliateModalPrimaryButton = (props) => {
    return (
        <button className={styles.affiliate__btn_blue} {...props}>
            {props.children}
        </button>
      )
  };

  export const StorehouseModalWhiteButton = (props) => {
    return (
      <button className={styles.storehouse__btn_white} {...props}>
          {props.children}
      </button>
    )
  };
  
  export const StorehouseModalPrimaryButton = (props) => {
      return (
          <button className={styles.storehouse__btn_blue} {...props}>
              {props.children}
          </button>
        )
    };
