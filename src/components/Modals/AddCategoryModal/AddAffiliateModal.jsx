import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { AffiliateModalPrimaryButton, AffiliateModalWhiteButton } from "../../Buttons/AffiliateModalButton";
import outlineImg from '../../../assets/img/outline.svg'
import styles from '../../../styles/add_affiliate_modal.module.scss'

const AddAffiliateModal = () => {
  return (
    <div className={styles.affiliate_modal}>
        <h3>Новый филиал <CloseOutlined style={{cursor: 'pointer'}} /></h3>
        <p>Добавьте фотографию филиала</p>
        <div className={styles.add__img}>
          <div className={styles.div}>
            <img src={outlineImg} alt="Error :(" />
            <p>Перетащите изображение для изменения или <span>обзор</span></p>
          </div>
        </div>
        <p>Название и адрес</p>
        <span className={styles.inp_span}>Название кофейни</span>
        <input type="text" className={styles.affiliate_modal_inps} placeholder="Название филиала" />
        <span className={styles.inp_span}>Адрес</span>
        <input type="text" className={styles.affiliate_modal_inps} placeholder="Адрес нового филиала" />
        <span className={styles.inp_span}>Номер телефона</span>
        <input type="text" className={styles.affiliate_modal_inps} placeholder="Введите номер телефона" />
        <span className={styles.inp_span}>Ссылка на 2ГИС</span>
        <input type="text" className={styles.affiliate_modal_inps} placeholder="Вставьте ссылку на 2ГИС" />
        <span className={styles.inp_span}>Количество столиков</span>
        <input type="text" className={styles.affiliate_modal_inps} placeholder="Введите количество столиков" />
      <div className={styles.timetable}>
        <p>График работы</p>
        <div className={styles.timetable_title}>
          <p>День недели</p>
          <p>Время работы</p>
        </div>
        <hr />
      </div>
      <div className={styles.btns}>
        <AffiliateModalWhiteButton>Отмена</AffiliateModalWhiteButton>
        <AffiliateModalPrimaryButton>Сохранить</AffiliateModalPrimaryButton>
      </div>
    </div>
  )
};

export default AddAffiliateModal;
