import { createRoot } from 'react-dom/client'
import { App } from './App'
import { ToastContainer } from 'react-toastify'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <>
    <ToastContainer limit={1} />
    <App />
  </>
)
