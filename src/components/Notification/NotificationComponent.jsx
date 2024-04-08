import React, { useEffect, useState } from 'react'
import WebSocket from 'websocket'

const NotificationComponent = () => {
	const [notification, setNotification] = useState('')

	useEffect(() => {
		// Устанавливаем соединение WebSocket
		const client = new WebSocket.client('wss/admin/(?P<user_id>\d+)/$')

		// Обработчик события при получении сообщения
		client.onmessage = message => {
			const data = JSON.parse(message.data)
			setNotification(data.notification)
		}

		// Закрываем соединение WebSocket при размонтировании компонента
		return () => {
			client.close()
		}
	}, [])

	return (
		<div>
			{notification && <div className='notification'>{notification}</div>}
		</div>
	)
}

export default NotificationComponent
