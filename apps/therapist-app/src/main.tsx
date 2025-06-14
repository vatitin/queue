import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.tsx'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'

createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider authClient={keycloak}>
  <StrictMode>
      <App />
  </StrictMode>,
  </ReactKeycloakProvider>
)
