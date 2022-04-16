import './App.css'

import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { Alert, CssBaseline, Grid, Snackbar } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { darkTheme } from './utils/themes/dark'
import { lightTheme } from './utils/themes/light'

import MainPage from './Pages/MainPage'
import NavBar from './components/NavBar'
import FavoritesPage from './Pages/FavoritesPage'
import NoMatch from './Pages/NoMatch'

import { getGeolocation } from './redux/location/locationsSlice'
import { closeNotification } from './redux/notification/notificationSlice'


const App = () => {
  const dispatch = useDispatch()
  const userTheme = useSelector(state => state.userSettings.theme)
  const notification = useSelector(state => state.notification)

  const mainPalette = userTheme === 'light' ? lightTheme : darkTheme

  const theme = createTheme({
    palette: mainPalette,
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((result) => {
      dispatch(getGeolocation(result.coords.latitude, result.coords.longitude))
    })
  }, [])

  const closeError = () => {
    dispatch(closeNotification())
  }

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <CssBaseline />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={notification.open}
          onClose={closeError}
        >
          <Alert severity={notification.error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
        <Grid container>
          <Grid item xs={12}>
            <NavBar />
            <Routes >
              <Route path='/' exact element={<MainPage />} />
              <Route path='/favorites' exact element={<FavoritesPage />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Grid>
        </Grid>
      </HelmetProvider>
    </ThemeProvider>
  )
}

export default App
