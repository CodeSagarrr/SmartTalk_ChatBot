import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './Context/AuthContext.tsx';
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <>
  <AuthProvider>
    <Router>
      <App />
      <Toaster
          position={'top-center'}
          reverseOrder={false}
        />
    </Router>
  </AuthProvider>
  </>
)
