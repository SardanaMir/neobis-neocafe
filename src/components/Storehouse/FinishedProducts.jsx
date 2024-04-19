import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import vertical from '../../assets/img/vertical.svg'
import { getBranches } from '../../redux/slices/branchesSlice'
import { openModal } from '../../redux/slices/modalSlice'
import { getProducts } from '../../redux/slices/storageSlice'
import CategoriesPopUp from '../PopUp/CategoriesPopUp'
import EditDeletePopUp from '../PopUp/EditDeletePopUp'
import styles from './storehouse.module.scss'

const FinishedProducts = () => {
	const [isPopUpOpen, setPopUpOpen] = useState(false)
	const [isActionsPopUpOpen, setActionsPopUpOpen] = useState(false)
	const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
	const [id, setId] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 5

	const dispatch = useDispatch()

	const storhouseOne = useSelector(state => state.items.search)
	const { data_storage } = useSelector(state => state.storage)
	const { data } = useSelector(state => state.branches.data_branches)

	const sortedData = data_storage?.filter(storhouse =>
		storhouse.name.toLowerCase().includes(storhouseOne.toLowerCase())
	)
	const readyProducts = sortedData?.filter(
		product => product.category === 'Готовые продукты'
	)
	const finishedProducts = readyProducts?.filter(
		product => product.is_running_out === false
	)

	const handleCategoryClick = () => {
		setPopUpOpen(!isPopUpOpen)
	}

	const handlePopUpClose = () => {
		setActionsPopUpOpen(false)
	}

	const handleActionClick = (e, id) => {
		setId(id)
		setPopupPosition({ x: e.clientX, y: e.clientY })
		setActionsPopUpOpen(!isActionsPopUpOpen)
	}

	useEffect(() => {
		dispatch(getBranches())
	}, [])

	const handleDeleteModalOpen = () => {
		dispatch(
			openModal({
				modalType: 'deleteCategory',
				modalProps: {
					title: 'Удаление продукта',
					subtitle: `Вы действительно хотите удалить этот продукт?`,
					action: 'deleteProductInStorhouse',
					id: id,
				},
			})
		)
	}

	const handleEditModalOpen = () => {
		dispatch(
			openModal({
				modalType: 'editStorhouseProduct',
				modalProps: {
					id: id,
				},
			})
		)
		setActionsPopUpOpen(false)
	}

	const handleOpenModal = () => {
		dispatch(
			openModal({
				modalType: 'addAffiliateModal',
				modalProps: {},
			})
		)
	}

	useEffect(() => {
		dispatch(getProducts())
	}, [])

	const handlePageChange = page => {
		setCurrentPage(page)
	}

	const startIndex = (currentPage - 1) * pageSize
	const endIndex = startIndex + pageSize

	const currentPageData = finishedProducts.slice(startIndex, endIndex)

	return (
		<div className={styles.con}>
			<table className={styles.table}>
				<thead>
					<tr className={styles.first_tr}>
						<th>
							<span>№</span>Наименование
						</th>
						<th>Количество</th>
						<th>Лимит</th>
						<th>Дата прихода</th>
						<th>Филиал</th>
					</tr>
				</thead>
				<tbody>
					{currentPageData?.map((product, index) => (
						<tr key={product.id} className={styles.list_product}>
							<td>
								<span>№{index + 1}</span>
								{product.name}
							</td>
							<td>
								{product.quantity} {product.quantity_unit}
							</td>
							<td>
								{product.limit} {product.limit_unit}
							</td>
							<td>{product.arrival_date}</td>
							<td>
								{data?.map(branch => {
									if (branch.id === product.branch) {
										return branch.name
									}
								})}
								<img
									src={vertical}
									alt='Error :('
									className={styles.tableIcon}
									onClick={e => handleActionClick(e, product.id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination
				showSizeChanger
				current={currentPage}
				pageSize={pageSize}
				total={finishedProducts.length}
				onChange={handlePageChange}
				className={styles.pagination}
			/>
			{isPopUpOpen && (
				<CategoriesPopUp
					setPopUpOpen={setPopUpOpen}
					handleOpenModal={handleOpenModal}
				/>
			)}
			{isActionsPopUpOpen && (
				<EditDeletePopUp
					x={popupPosition.x}
					y={popupPosition.y}
					closePopUp={handlePopUpClose}
					handleEditModalOpen={handleEditModalOpen}
					handleDeleteModalOpen={handleDeleteModalOpen}
				/>
			)}
		</div>
	)
}

export default FinishedProducts
