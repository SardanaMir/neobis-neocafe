import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import InputMask from "react-input-mask";
import { CloseOutlined } from "@ant-design/icons";
import { AffiliateModalPrimaryButton, AffiliateModalWhiteButton } from "../../Buttons/Buttons";
import outlineImg from '../../../assets/img/outline.svg'
import { closeModal } from "../../../redux/slices/modalSlice";
import styles from '../../../styles/add_affiliate_modal.module.scss'
import { setBranchesProduct } from "../../../redux/slices/branchesSlice";

const AddAffiliateModal = () => {
  const [tableDays, setTableDays] = useState({
    monday: false,
    monday_start_time: "",
    monday_end_time: "",
    tuesday: false,
    tuesday_start_time: "",
    tuesday_end_time: "",
    wednesday: false,
    wednesday_start_time: "",
    wednesday_end_time: "",
    thursday: false,
    thursday_start_time: "",
    thursday_end_time: "",
    friday: false,
    friday_start_time: "",
    friday_end_time: "",
    saturday: false,
    saturday_start_time: "08:00",
    saturday_end_time: "17:00",
    sunday: false,
    sunday_start_time: "08:00",
    sunday_end_time: "17:00"
  })

  const [formBranch, setFormBranch] = useState({
    name: "",
    address: "",
    phone_number: "",
    link_to_map: "",
    counts_of_tables: 0
  })
  const [selectedImage, setSelectedImage] = useState('');
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const dispatch = useDispatch();
  const startsWithTwo = tableDays.friday_start_time[0] === '2'


//   const mask = [
//     /[0-2]/,
//     startsWithTwo ? /[0-3]/ : /[0-9]/,
//     ':',
//     /[0-5]/,
//     /[0-9]/
//   ]


  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleChangeDays = (e) => {
    const { name, value } = e.target
    setTableDays({
      ...tableDays,
      [name]: value,
    })
  }
  const handleChangeDaysCheckbox = (e) => {
    const { name, checked } = e.target
    setTableDays({
      ...tableDays,
      [name]: checked,
    })
  }

  const handleChangeFormBranch = (e) => {
    const { name, value } = e.target
    setFormBranch({
      ...formBranch,
      [name]: value,
    })
  }

  const handleSetProdBranch = () => {
    const formData = new FormData();
    // formData.append("username", "Chris");
    // formData.append('moday', tableDays.monday)
    // formData.append('monday_start_time', tableDays.monday_start_time)
    // formData.append('monday_end_time', tableDays.monday_end_time)
    // formData.append('tuesday', tableDays.tuesday)
    // formData.append('tuesday_start_time', tableDays.tuesday_start_time)
    // formData.append('tuesday_end_time', tableDays.tuesday_end_time)
    // formData.append('wednesday', tableDays.wednesday)
    // formData.append('wednesday_start_time', tableDays.wednesday_start_time)
    // formData.append('wednesday_end_time', tableDays.wednesday_end_time)
    // formData.append('thursday', tableDays.thursday)
    // formData.append('thursday_start_time', tableDays.thursday_start_time)
    // formData.append('thursday_end_time', tableDays.thursday_end_time)
    // formData.append('friday', tableDays.friday)
    // formData.append('friday_start_time', tableDays.friday_start_time)
    // formData.append('friday_end_time', tableDays.friday_end_time)
    // formData.append('saturday', tableDays.saturday)
    // formData.append('saturday_start_time', tableDays.saturday_start_time)
    // formData.append('saturday_end_time', tableDays.saturday_end_time)
    // formData.append('sunday', tableDays.sunday)
    // formData.append('sunday_start_time', tableDays.sunday_start_time)
    // formData.append('sunday_end_time', tableDays.sunday_end_time)
    formData.append('image', selectedImage)

    const data = {
      schedule: {
        ...tableDays
      },
      formData,
      name: formBranch.name,
      address: formBranch.address,
      phone_number: formBranch.phone_number,
      link_to_map: formBranch.link_to_map,
      counts_of_tables: formBranch.counts_of_tables

    }
    // formData.append('name', formBranch.name)
    // formData.append('address', formBranch.address)
    // formData.append('phone_number', formBranch.phone_number)
    // formData.append('link_to_map', formBranch.link_to_map)
    // formData.append('counts_of_tables', formBranch.counts_of_tables)
    
    dispatch(setBranchesProduct({ data, handleCloseModal }))
  }


  return (
    <div className={styles.root}>
      <div className={styles.affiliate_modal}>
        <h3>Новый филиал <CloseOutlined style={{cursor: 'pointer'}} onClick={handleCloseModal} /></h3>
        <p>Добавьте фотографию филиала</p>
        <div className={styles.add__img}>
          <div className={styles.div}>
            <img 
              src={selectedImage || outlineImg} 
              alt="Error :(" 
              onClick={handleImageClick}
              className={styles.affiliate__img_main}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={(event) => handleImageChange(URL.createObjectURL(event.target.files[0]))}
            />
            <p>Перетащите изображение для изменения или <span>обзор</span></p>
          </div>
        </div>
        <p>Название и адрес</p>
        <span className={styles.inp_span}>Название кофейни</span>
        <input 
          type="text" 
          name="name"
          value={formBranch.name}
          className={styles.affiliate_modal_inps} 
          placeholder="Название филиала"
          onChange={handleChangeFormBranch}
        />
        <span className={styles.inp_span}>Адрес</span>
        <input 
          type="text" 
          name="address"
          value={formBranch.address}
          className={styles.affiliate_modal_inps} 
          placeholder="Адрес нового филиала" 
          onChange={handleChangeFormBranch}
        />
        <span className={styles.inp_span}>Номер телефона</span>
        <input 
          type="text" 
          name="phone_number"
          value={formBranch.phone_number}
          className={styles.affiliate_modal_inps} 
          placeholder="Введите номер телефона" 
          onChange={handleChangeFormBranch}
        />
        <span className={styles.inp_span}>Ссылка на 2ГИС</span>
        <input 
          type="text" 
          name="link_to_map"
          value={formBranch.link_to_map}
          className={styles.affiliate_modal_inps} 
          placeholder="Вставьте ссылку на 2ГИС" 
          onChange={handleChangeFormBranch}
        />
        <span className={styles.inp_span}>Количество столиков</span>
        <input 
          type="number" 
          name="counts_of_tables"
          value={formBranch.counts_of_tables}
          className={styles.affiliate_modal_inps} 
          placeholder="Введите количество столиков" 
          onChange={handleChangeFormBranch}
        />
      <div className={styles.timetable}>
        <p>График работы</p>
        <div className={styles.timetable_title}>
          <p>День недели</p>
          <p>Время работы</p>
        </div>
        <hr />
        <div className={styles.day}>
          <p className={styles.p}>Понедельник</p>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            value={tableDays.monday}
            name="monday"
            onChange={handleChangeDaysCheckbox}
          />
          <div className={styles.inps}>
            <InputMask 
              mask={mask} 
              name="monday_start_time"
              onChange={handleChangeDays} 
              value={tableDays.monday_start_time}
            />
            <span>-</span>
            <InputMask 
              mask={mask} 
              name="monday_end_time"
              onChange={handleChangeDays} 
              value={tableDays.monday_end_time} 
            />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Вторник</p>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            name="thursday"
            onChange={handleChangeDaysCheckbox}
            value={tableDays.thursday}
          />
          <div className={styles.inps}>
            <InputMask 
              mask={mask} 
              onChange={handleChangeDays} 
              value={tableDays.tuesday_start_time} 
              name="tuesday_start_time" 
            />
            <span>-</span>
            <InputMask 
              mask={mask} 
              name="tuesday_end_time"
              onChange={handleChangeDays} 
              value={tableDays.tuesday_end_time} 
            />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Среда</p>
          <input 
            type="checkbox" 
            name="wednesday"
            className={styles.checkbox} 
            onChange={handleChangeDaysCheckbox}
            value={tableDays.wednesday}
          />
          <div className={styles.inps}>
            <InputMask 
              mask={mask} 
              name="wednesday_start_time"
              onChange={handleChangeDays} 
              value={tableDays.wednesday_start_time}
            />
            <span>-</span>
            <InputMask 
              mask={mask} 
              name="wednesday_end_time"
              onChange={handleChangeDays} 
              value={tableDays.wednesday_end_time} 
            />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Четверг</p>
          <input 
            type="checkbox" 
            name="thursday"
            className={styles.checkbox} 
            onChange={handleChangeDaysCheckbox}
            value={tableDays.thursday}
          />
          <div className={styles.inps}>
            <InputMask 
              mask={mask} 
              name="thursday_start_time"
              onChange={handleChangeDays} 
              value={tableDays.thursday_start_time}
            />
            <span>-</span>
            <InputMask 
              mask={mask} 
              name="thursday_end_time"
              onChange={handleChangeDays} 
              value={tableDays.thursday_end_time}
            />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Пятница</p>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            name="friday"
            value={tableDays.friday}
            onChange={handleChangeDaysCheckbox}
          />
          <div className={styles.inps}>
            <InputMask 
              mask={mask}
              name="friday_start_time" 
              onChange={handleChangeDays} 
              value={tableDays.friday_start_time}
            />
            <span>-</span>
            <InputMask 
              mask={mask}
              name="friday_end_time" 
              onChange={handleChangeDays} 
              value={tableDays.friday_end_time} 
            />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Суббота</p>
          <input 
            type="checkbox" 
            disabled 
            className={styles.checkbox} 
            value={tableDays.saturday}
          />
          <div className={styles.inps}>
            <InputMask mask={mask} value={tableDays.saturday_start_time} disabled className={styles.disabledInp} />
            <span>-</span>
            <InputMask mask={mask} value={tableDays.saturday_end_time} disabled className={styles.disabledInp} />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Воскресенье</p>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            value={tableDays.sunday}
            disabled 
          />
          <div className={styles.inps}>
            <InputMask mask={mask} value={tableDays.sunday_start_time} disabled className={styles.disabledInp} />
            <span>-</span>
            <InputMask mask={mask} value={tableDays.sunday_end_time}  disabled className={styles.disabledInp} />
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <AffiliateModalWhiteButton onClick={handleCloseModal}>Отмена</AffiliateModalWhiteButton>
        <AffiliateModalPrimaryButton onClick={handleSetProdBranch}>Сохранить</AffiliateModalPrimaryButton>
      </div>
    </div>
    </div>
  )
};
export default AddAffiliateModal;
