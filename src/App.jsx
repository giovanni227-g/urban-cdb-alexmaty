import Header from './components/Header'
import Hero from './components/Hero'
import UltimiLavori from './components/UltimiLavori'
import Pacchetti from './components/Pacchetti'
import ChiSiamoContatti from './components/ChiSiamoContatti'
import SocialProof from './components/SocialProof'
import WhatsAppFAB from './components/WhatsAppFAB'
import PrivacyPolicy from './components/PrivacyPolicy'

function App() {
  if (window.location.pathname === '/privacy') {
    return <PrivacyPolicy />
  }

  return (
    <div className="min-h-[100dvh] text-white font-body">
      {/* Sfondo: la foto reale del salone, gradata (assets-source → public/hero-bg.jpg),
          sotto un unico velo nero uniforme. Nessuna luce colorata dipinta sopra e nessun
          piano tonale diverso per sezione: la pagina è una sola superficie. */}
      <div
        className="fixed inset-0 bg-cover"
        style={{
          zIndex: 0,
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.80) 40%, rgba(0,0,0,0.86) 100%), url(/hero-bg.jpg)',
          backgroundPosition: '50% 38%',
        }}
      />

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
