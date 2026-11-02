import '@fontsource-variable/inter/wght.css'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import './styles/main.css'

import { initCareer } from './career'
import { initNav } from './nav'
import { initShowroom } from './showroom/showroom'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

initNav()
initShowroom(reducedMotion)
initCareer()

if (!reducedMotion) {
  // Hold the hero back until the intro chunk has applied its start states; if
  // the chunk fails, the catch reveals the finished page instead.
  document.documentElement.classList.add('intro-pending')

  void import('./motion/motion')
    .then(({ initMotion }) => initMotion())
    .catch(() => document.documentElement.classList.remove('intro-pending'))
}

document.documentElement.classList.add('is-loaded')
