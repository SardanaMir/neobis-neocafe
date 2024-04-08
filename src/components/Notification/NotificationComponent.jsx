import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import WebSocket from 'websocket'
	
	const NotificationComponent = () => {
		const { id } = useSelector(state => state.user.userId)
		const [notification, setNotification] = useState('');
		
		useEffect(() => {
			const client = new WebSocket(`wss://helsinki-backender.org.kg/client/${id}/`)
			
			client.onmessage = (message) => {
				const data = JSON.parse(message.data);
				console.log(message);
				console.log(data);
				setNotification(data.notification);
			};
	
			// Закрываем соединение WebSocket при размонтировании компонента
			return () => {
				client.close();
			};
		}, []);
	
		return (
			<div>
				{notification && (
					<div className="notification">
						{notification}
					</div>
				)}
			</div>
		);
	};
	
	export default NotificationComponent;