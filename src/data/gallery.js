import work1 from '../assets/img/work-1.jpg'
import work1Sm from '../assets/img/work-1-sm.jpg'
import work2 from '../assets/img/work-2.jpg'
import work2Sm from '../assets/img/work-2-sm.jpg'
import poster1 from '../assets/img/video-1-poster.jpg'
import poster2 from '../assets/img/video-2-poster.jpg'
import poster3 from '../assets/img/video-3-poster.jpg'
import poster4 from '../assets/img/video-4-poster.jpg'

// Aggiorna INSTAGRAM_URL con il tuo handle Instagram
export const INSTAGRAM_URL = 'https://www.instagram.com/alexematy_urbancdb'

export const galleryItems = [
  {
    type: 'photo',
    src: work1,
    srcSet: `${work1Sm} 700w, ${work1} 1100w`,
    alt: 'Taglio scalato e piega con riflessi ramati realizzati nel salone',
    label: 'Taglio e piega',
    detail: 'Styling',
  },
  {
    type: 'video',
    src: '/gallery/video-1.mp4',
    poster: poster1,
    alt: 'Reel',
    label: 'Reel salone',
    detail: 'Dietro le quinte',
  },
  {
    type: 'video',
    src: '/gallery/video-2.mp4',
    poster: poster2,
    alt: 'Reel',
    label: 'Piega',
    detail: 'Movimento',
  },
  {
    type: 'photo',
    src: work2,
    srcSet: `${work2Sm} 700w, ${work2} 1100w`,
    alt: 'Capelli castani lunghi con frangia e onde morbide',
    label: 'Colore e forma',
    detail: 'Look finale',
  },
  {
    type: 'video',
    src: '/gallery/video-3.mp4',
    poster: poster3,
    alt: 'Reel',
    label: 'Un fiore per le clienti',
    detail: 'Festa della donna',
  },
  {
    type: 'video',
    src: '/gallery/video-4.mp4',
    poster: poster4,
    alt: 'Reel',
    label: 'Acconciatura',
    detail: 'Risultato',
  },
]
