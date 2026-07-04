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
    <div className="min-h-screen text-white font-body">
      <div className="fixed inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/hero-bg.jpg)', zIndex: 0 }} />
      {/* Legibility gradient — rich at the edges, lets the salon breathe through the middle */}
      <div
        className="fixed inset-0"
        style={{ zIndex: 1, background: 'linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.62) 42%, rgba(0,0,0,0.78) 78%, #000 100%)' }}
      />
      {/* Brand "stage light" — magenta bloom from lower-centre instead of a flat purple wash.
          Kept permanently on so the hero photo always carries the glow. */}
      <div
        className="fixed inset-0"
        style={{ zIndex: 1, background: 'radial-gradient(62% 48% at 50% 76%, rgba(230,0,125,0.28) 0%, rgba(230,0,125,0.08) 45%, transparent 72%)' }}
      />

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
