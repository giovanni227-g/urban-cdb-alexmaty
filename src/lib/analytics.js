export function trackEvent(name, data) {
  if (typeof window === 'undefined' || typeof window.umami?.track !== 'function') return

  try {
    window.umami.track(name, data)
  } catch {
    // Il tracking non deve mai interferire con la navigazione verso servizi esterni.
  }
}

export const trackWhatsAppClick = (position) =>
  trackEvent('whatsapp_click', { position })

export const trackPackageClick = (packageName, packageVariant) =>
  trackEvent('package_click', {
    package_name: packageName,
    package_variant: packageVariant,
  })

export const trackServiceClick = (serviceName) =>
  trackEvent('service_click', { service_name: serviceName })

export const trackInstagramClick = (section) =>
  trackEvent('instagram_click', { section })
