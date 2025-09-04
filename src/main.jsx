import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import { Provider as ReduxProvider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
     <ReduxProvider store={store}>
    <App />
     <ToastContainer />
     </ReduxProvider>
    </BrowserRouter>
)
