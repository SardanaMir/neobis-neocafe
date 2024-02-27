export const MainRoutes = () => {
    const PUBLIC_ROUTES = [
      {
        link: '/',
        element: <Login />,
        id: 1,
      },
      {
        link: '/main',
        element: <Main />,
        id: 2,
      },
      {
        link: '/code',
        element: <CheckCode />,
        id: 3,
      },
    ]
  