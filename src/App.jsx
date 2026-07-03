import Header from './components/Header'
import Hero from './components/Hero'
import UltimiLavori from './components/UltimiLavori'
import Pacchetti from './components/Pacchetti'
import ChiSiamoContatti from './components/ChiSiamoContatti'
import SocialProof from './components/SocialProof'
import WhatsAppFAB from './components/WhatsAppFAB'

function App() {
  return (
    <div className="min-h-screen text-white font-body">
      <div className="fixed inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/hero-bg.jpg)', zIndex: 0 }} />
      <div className="fixed inset-0 bg-black/65" style={{ zIndex: 1 }} />
      <div className="fixed inset-0 bg-brand-magenta/15" style={{ zIndex: 1 }} />

      <Header />
      <WhatsAppFAB />

      <main style={{ position: 'relative', zIndex: 2 }}>
        <div id="hero"><Hero /></div>
        <div className="bg-black">
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
