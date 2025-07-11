import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import adminStore from './store/store'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={adminStore}>
      <App />
    </Provider>
  </BrowserRouter>

)
