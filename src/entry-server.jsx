import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// Usato solo al build da scripts/prerender.mjs: stesso albero di main.jsx, così l'idratazione combacia
export function render(path) {
  return renderToString(
    <StrictMode>
      <ErrorBoundary>
        <App path={path} />
      </ErrorBoundary>
    </StrictMode>,
  )
}
