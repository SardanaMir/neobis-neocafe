import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputMask from "react-input-mask";
import { CloseOutlined } from "@ant-design/icons";
import { AffiliateModalPrimaryButton, AffiliateModalWhiteButton } from "../../Buttons/Buttons";
import outlineImg from '../../../assets/img/outline.svg'
import { closeModal } from "../../../redux/slices/modalSlice";
import styles from '../../../styles/add_affiliate_modal.module.scss'

const AddAffiliateModal = () => {
  const [timeMonStart, setMonTimeStart] = useState('11:00 ')
  const [timeMonEnd, setMonTimeEnd] = useState('22:00 ')
  const dispatch = useDispatch();
  const startsWithTwo = timeMonStart[0] === '2'

  const handleInputMonStart = ({ target: { value } }) => setMonTimeStart(value)
  const handleInputMonEnd = ({ target: { value } }) => setMonTimeEnd(value)

  const mask = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ':',
    /[0-5]/,
    /[0-9]/
  ]

  const handleOpenModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className={styles.root}>
      <div className={styles.affiliate_modal}>
        <h3>Новый филиал <CloseOutlined style={{cursor: 'pointer'}} onClick={handleOpenModal} /></h3>
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
        <div className={styles.day}>
          <p className={styles.p}>Понедельник</p>
          <input type="checkbox" className={styles.checkbox} />
          <div className={styles.inps}>
            <InputMask mask={mask} onChange={handleInputMonStart} value={timeMonStart}/>
            <span>-</span>
            <InputMask mask={mask} onChange={handleInputMonEnd} value={timeMonEnd} />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Понедельник</p>
          <input type="checkbox" className={styles.checkbox} />
          <div className={styles.inps}>
            <InputMask mask={mask} onChange={handleInputMonStart} value={timeMonStart}/>
            <span>-</span>
            <InputMask mask={mask} onChange={handleInputMonEnd} value={timeMonEnd} />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Понедельник</p>
          <input type="checkbox" className={styles.checkbox} />
          <div className={styles.inps}>
            <InputMask mask={mask} onChange={handleInputMonStart} value={timeMonStart}/>
            <span>-</span>
            <InputMask mask={mask} onChange={handleInputMonEnd} value={timeMonEnd} />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Понедельник</p>
          <input type="checkbox" className={styles.checkbox} />
          <div className={styles.inps}>
            <InputMask mask={mask} onChange={handleInputMonStart} value={timeMonStart}/>
            <span>-</span>
            <InputMask mask={mask} onChange={handleInputMonEnd} value={timeMonEnd} />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Понедельник</p>
          <input type="checkbox" className={styles.checkbox} />
          <div className={styles.inps}>
            <InputMask mask={mask} onChange={handleInputMonStart} value={timeMonStart}/>
            <span>-</span>
            <InputMask mask={mask} onChange={handleInputMonEnd} value={timeMonEnd} />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Суббота</p>
          <input type="checkbox" disabled className={styles.checkbox} />
          <div className={styles.inps}>
            <InputMask mask={mask} onChange={handleInputMonStart} value={timeMonStart} disabled/>
            <span>-</span>
            <InputMask mask={mask} onChange={handleInputMonEnd} value={timeMonEnd} disabled />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Воскресенье</p>
          <input type="checkbox" className={styles.checkbox} disabled />
          <div className={styles.inps}>
            <InputMask mask={mask} onChange={handleInputMonStart} value={timeMonStart} disabled />
            <span>-</span>
            <InputMask mask={mask} onChange={handleInputMonEnd} value={timeMonEnd} disabled />
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <AffiliateModalWhiteButton>Отмена</AffiliateModalWhiteButton>
        <AffiliateModalPrimaryButton>Сохранить</AffiliateModalPrimaryButton>
      </div>
    </div>
    </div>
  )
};

export default AddAffiliateModal;
