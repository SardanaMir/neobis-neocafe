import { PlusOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import bell from '../../assets/img/Bell.svg'
import searchIcon from '../../assets/img/Vector.svg'
import { searchByName } from '../../redux/slices/itemsSlice'
import { openModal } from '../../redux/slices/modalSlice'
import styles from './header.module.scss'

const AffiliatesHeader = ({ handleOpenNotificationComponent }) => {
	const affiliate = useSelector(state => state.items.search)
	const dispatch = useDispatch()

	const handleOpenModal = () => {
		dispatch(
			openModal({
				modalType: 'addAffiliateModal',
				modalProps: {},
			})
		)
	}

	const handleSearchByName = e => {
		const branch = e.target.value
		dispatch(searchByName(branch))
	}

	return (
		<Layout.Header className={styles.header}>
			<h2>Филиалы</h2>
			<div className={styles.header__list}>
				<img src={searchIcon} alt='Error :(' className={styles.btn_search} />
				<input
					type='search'
					placeholder='Поиск'
					value={affiliate}
					onChange={handleSearchByName}
				/>
				<button onClick={handleOpenModal}>
					Создать <PlusOutlined className={styles.btn_plus} />
				</button>
				<img
					src={bell}
					alt='Error'
					width={52}
					className={styles.header__icon}
          onClick={handleOpenNotificationComponent}
				/>
			</div>
		</Layout.Header>
	)
}

export default AffiliatesHeader
