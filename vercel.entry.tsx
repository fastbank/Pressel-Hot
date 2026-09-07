import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Presell from './app/presell';
import './app/globals.css';

function App() {
  return <Presell links={window.location.pathname === '/links'} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
