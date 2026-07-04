export const BUSINESS = {
  whatsappNumber: '393382873428',
  whatsappMessage: 'Ciao! Vorrei prenotare un appuntamento da Alex & Maty',
  phone: '0815883171',
  phoneDisplay: '081 588 3171',
  address: 'Via Francesco Arnaldi 108/112, 80126 Napoli',
  mapsQuery: 'Via+Francesco+Arnaldi+108,+80126+Napoli',
  ratingDisplay: '4,8',
  reviewsCount: '31',
  since: '2001',
}

export const WA_LINK =
  `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`

export const WA_LINK_BARE = `https://wa.me/${BUSINESS.whatsappNumber}`

export const MAPS_URL = `https://maps.google.com/?q=${BUSINESS.mapsQuery}`

export const TRUST_MARKERS = [
  `${BUSINESS.ratingDisplay} Google`,
  `Dal ${BUSINESS.since}`,
  'Via F. Arnaldi',
]
