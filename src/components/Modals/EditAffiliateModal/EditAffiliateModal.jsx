import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputMask from "react-input-mask";
import { CloseOutlined } from "@ant-design/icons";
import { AffiliateModalPrimaryButton, AffiliateModalWhiteButton } from "../../Buttons/Buttons";
import outlineImg from '../../../assets/img/outline.svg'
import { closeModal } from "../../../redux/slices/modalSlice";
import { getBranchById, getBranches, editBranch } from "../../../redux/slices/branchesSlice";
import styles from '../../../styles/add_affiliate_modal.module.scss'

const EditAffiliateModal = ({ id }) => {
  const [schedule, setShedule] = useState({
    title: "Branch",
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null)


  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
    setSelectedImage(file)
  };
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.branches.branch)

  // const startsWithTwo = schedule?.monday_start_time[0] === '2'
  const startsWithTwo = 1 === '2'

  const mask = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ':',
    /[0-5]/,
    /[0-9]/
  ]

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleChangeDays = (e) => {
    const { name, value } = e.target
    setShedule({
      ...schedule,
      [name]: value,
    })
  }
  const handleChangeDaysCheckbox = (e) => {
    const { name, checked } = e.target
    setShedule({
      ...schedule,
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

  useEffect(() => {
    dispatch(getBranchById(id))
  }, []);

  useEffect(() => {
    setShedule({
      // title: data?.schedule.title,
      title: "Branch",
      monday: data?.schedule.monday,
      monday_start_time: data?.schedule.monday_start_time,
      monday_end_time: data?.schedule.monday_end_time,
      tuesday: data?.schedule.tuesday,
      tuesday_start_time: data?.schedule.tuesday_start_time,
      tuesday_end_time: data?.schedule.tuesday_end_time,
      wednesday: data?.schedule.wednesday,
      wednesday_start_time: data?.schedule.wednesday_start_time,
      wednesday_end_time: data?.schedule.wednesday_end_time,
      thursday: data?.schedule.thursday,
      thursday_start_time: data?.schedule.thursday_start_time,
      thursday_end_time: data?.schedule.thursday_end_time,
      friday: data?.schedule.friday,
      friday_start_time: data?.schedule.friday_start_time,
      friday_end_time: data?.schedule.friday_end_time,
      saturday: data?.schedule.saturday,
      saturday_start_time: "08:00",
      saturday_end_time: "17:00",
      sunday: data?.schedule.sunday,
      sunday_start_time: "08:00",
      sunday_end_time: "17:00"
    })
    setPreviewImage(data?.image)
    setSelectedImage(data?.image)
    setFormBranch({
      name: data?.name,
      address: data?.address,
      phone_number: data?.phone_number,
      link_to_map: data?.link_to_map,
      counts_of_tables: data?.counts_of_tables
    })
  }, [data, ]);

  const handleGetBranches = () => {
    dispatch(getBranches())
  }

  const handleEditBranch = () => {
    const formData = new FormData()
    for (const [key, value] of Object.entries(schedule)) {
      formData.append(`schedule.${key}`, value);
    }
    // const file = new File([selectedImage], 'image.jpg', { type: 'image/jpeg' });
    formData.append('image', selectedImage)
    formData.append('name', formBranch.name)
    formData.append('address', formBranch.address)
    formData.append('phone_number', formBranch.phone_number)
    formData.append('link_to_map', formBranch.link_to_map)
    formData.append('counts_of_tables', formBranch.counts_of_tables)
    dispatch(editBranch({ id, formData, handleCloseModal, handleGetBranches }))
    }

  return (
    <div className={styles.root}>
      <div className={styles.affiliate_modal}>
        <p className={styles.title}>Редактирование<CloseOutlined style={{cursor: 'pointer'}} onClick={handleCloseModal} /></p>
        <p>Добавьте фотографию филиала</p>
        <div className={styles.add__img}>
          <div className={styles.div}>
            <img 
              src={previewImage || outlineImg} 
              alt="Error :(" 
              onClick={handleImageClick}
              className={styles.affiliate__img_main}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageChange}
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
            value={schedule.monday}
            name="monday"
            onChange={handleChangeDaysCheckbox}
          />
          <div className={styles.inps}>
            <InputMask 
              mask={mask} 
              name="monday_start_time"
              onChange={handleChangeDays} 
              value={schedule.monday_start_time}
            />
            <span>-</span>
            <InputMask 
              mask={mask} 
              name="monday_end_time"
              onChange={handleChangeDays} 
              value={schedule.monday_end_time} 
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
            value={schedule.thursday}
          />
          <div className={styles.inps}>
            <InputMask 
              mask={mask} 
              onChange={handleChangeDays} 
              value={schedule.tuesday_start_time} 
              name="tuesday_start_time" 
            />
            <span>-</span>
            <InputMask 
              mask={mask} 
              name="tuesday_end_time"
              onChange={handleChangeDays} 
              value={schedule.tuesday_end_time} 
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
            value={schedule.wednesday}
          />
          <div className={styles.inps}>
            <InputMask 
              mask={mask} 
              name="wednesday_start_time"
              onChange={handleChangeDays} 
              value={schedule.wednesday_start_time}
            />
            <span>-</span>
            <InputMask 
              mask={mask} 
              name="wednesday_end_time"
              onChange={handleChangeDays} 
              value={schedule.wednesday_end_time} 
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
            value={schedule.thursday}
          />
          <div className={styles.inps}>
            <InputMask 
              mask={mask} 
              name="thursday_start_time"
              onChange={handleChangeDays} 
              value={schedule.thursday_start_time}
            />
            <span>-</span>
            <InputMask 
              mask={mask} 
              name="thursday_end_time"
              onChange={handleChangeDays} 
              value={schedule.thursday_end_time}
            />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Пятница</p>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            name="friday"
            value={schedule.friday}
            onChange={handleChangeDaysCheckbox}
          />
          <div className={styles.inps}>
            <InputMask 
              mask={mask}
              name="friday_start_time" 
              onChange={handleChangeDays} 
              value={schedule.friday_start_time}
            />
            <span>-</span>
            <InputMask 
              mask={mask}
              name="friday_end_time" 
              onChange={handleChangeDays} 
              value={schedule.friday_end_time} 
            />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Суббота</p>
          <input 
            type="checkbox" 
            disabled 
            className={styles.checkbox} 
            value={schedule.saturday}
          />
          <div className={styles.inps}>
            <InputMask mask={mask} value={schedule.saturday_start_time} disabled className={styles.disabledInp} />
            <span>-</span>
            <InputMask mask={mask} value={schedule.saturday_end_time} disabled className={styles.disabledInp} />
          </div>
        </div>
        <div className={styles.day}>
          <p className={styles.p}>Воскресенье</p>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            value={schedule.sunday}
            disabled 
          />
          <div className={styles.inps}>
            <InputMask mask={mask} value={schedule.sunday_start_time} disabled className={styles.disabledInp} />
            <span>-</span>
            <InputMask mask={mask} value={schedule.sunday_end_time}  disabled className={styles.disabledInp} />
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <AffiliateModalWhiteButton onClick={handleCloseModal}>Отмена</AffiliateModalWhiteButton>
        <AffiliateModalPrimaryButton onClick={handleEditBranch}>Сохранить</AffiliateModalPrimaryButton>
      </div>
    </div>
    </div>
  )
};

export default EditAffiliateModal;
