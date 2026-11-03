import '@fontsource-variable/inter/wght.css'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import './styles/main.css'

import { initCareer } from './career'
import { initHeroGrid } from './hero-grid'
import { initNav } from './nav'
import { initPatent } from './patent'
import { initShowroom } from './showroom/showroom'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

initHeroGrid(reducedMotion)
initNav()
initShowroom(reducedMotion)
initCareer()
initPatent(reducedMotion)

if (!reducedMotion) {
  void import('./motion/motion').then(({ initMotion }) => initMotion())
}

document.documentElement.classList.add('is-loaded')
