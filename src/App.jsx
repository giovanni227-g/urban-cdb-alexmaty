import Header from './components/Header'
import Hero from './components/Hero'
import UltimiLavori from './components/UltimiLavori'
import Pacchetti from './components/Pacchetti'
import ChiSiamoContatti from './components/ChiSiamoContatti'
import SocialProof from './components/SocialProof'
import WhatsAppFAB from './components/WhatsAppFAB'
import PrivacyPolicy from './components/PrivacyPolicy'

// `path` arriva dal pre-render al build (scripts/prerender.mjs), dove window non esiste
function App({ path = window.location.pathname }) {
  if (path === '/privacy') {
    return <PrivacyPolicy />
  }

  return (
    <div className="min-h-[100dvh] text-white font-body">
      {/* Sfondo: la foto reale del salone sotto un unico velo nero uniforme (.site-backdrop
          in index.css). Nessuna luce colorata dipinta sopra e nessun piano tonale diverso
          per sezione: la pagina è una sola superficie. */}
      <div className="site-backdrop fixed inset-0" style={{ zIndex: 0 }} />

      <Header />
      <WhatsAppFAB />

      <main style={{ position: 'relative', zIndex: 2 }}>
        <div id="hero"><Hero /></div>
        <div>
          <div id="lavori"><UltimiLavori /></div>
          <div id="prezzi"><Pacchetti /></div>
          <div id="chi-contatti"><ChiSiamoContatti /></div>
          <div id="recensioni"><SocialProof /></div>
        </div>
      </main>
    </div>
  )
}

export default App
