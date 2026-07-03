import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white text-center px-5">
          <div>
            <p className="font-display text-2xl mb-4">Qualcosa non ha funzionato.</p>
            <a href="tel:0815883171" className="text-brand-magenta underline">
              Chiamaci: 081 588 3171
            </a>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
