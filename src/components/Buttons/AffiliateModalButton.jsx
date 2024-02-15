import React from "react";
import { Button } from "antd";
import styles from './affiliate-modal-button.module.scss'

export const AffiliateModalWhiteButton = (props) => {
  return (
    <Button className={styles.affiliate__btn_blue} {...props}>
        {props.children}
    </Button>
  )
};

export const AffiliateModalPrimaryButton = (props) => {
    return (
        <Button className={styles.affiliate__btn_white} {...props}>
            {props.children}
        </Button>
      )
  };
