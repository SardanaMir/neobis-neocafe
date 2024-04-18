import { CloseOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../redux/slices/modalSlice'
import { getNotifications } from '../../redux/slices/notificationSlice'
import styles from './notification.module.scss'

const NotificationComponent = () => {
	const notification = useSelector(state => state.notification.notifications)
	const dispatch = useDispatch()
	const [notifications, setNotifications] = useState(notification.map(notification => ({
		id: notification.id,
		description: notification.description,
		date: notification.timestamp?.split(' ')[0],
		timestamp: notification.timestamp?.split(' ')[1],
		title: notification.title
	})))
	
	useEffect(() => {
		const socket = new WebSocket('wss://helsinki-backender.org.kg/ws/admin/60/')
		socket.onopen = () => {
      console.log('Соединение установлено');
    };

		socket.onmessage = event => {
			const data = JSON.parse(event.data)
				if (data.notifications.length) {
					setNotifications(prevState => [...prevState, data.notifications])
				}
		}
		// Очистка эффекта
		return () => {
			socket.close()
		}
	}, [])
	
	const closeModalNotification = () => {
		dispatch(closeModal())
	}
	
	useEffect(() => {
		dispatch(getNotifications())
	}, []);
	
	function flattenArray(arr) {
		return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), []);
	}
	
	const flattenedArray = flattenArray(notifications);

	return (
		<div className={styles.root}>
			<div className={styles.notification}>
				<div className={styles.title}>
					<p>
						Уведомления{' '}
						<CloseOutlined
							className={styles.close_icon}
							onClick={closeModalNotification}
						/>
					</p>
					<div className={styles.notification_line}></div>
					<button className={styles.notification__btn_clear}>Очистить</button>
				</div>
				<div className={styles.card_list}>
					{flattenedArray?.map(notification => (
						<div key={notification.id} className={styles.notification__card}>
							<div className={styles.notification__time}>
								<p>
									<span>{notification.date}</span>
									<span className={styles.time__query}></span>
									<span>{notification.timestamp}</span>
								</p>
								<CloseOutlined width={24} style={{ cursor: 'pointer' }} />
							</div>
							<p className={styles.product_name}>
								{notification.title} <span>{notification.description}</span>
							</p>
							<p className={styles.product_name}>
								Филиал: <span>NeoCafe Dzerzhinka</span>
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default NotificationComponent