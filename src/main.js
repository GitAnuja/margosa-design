import './style.css'
import archanaPhoto from './assets/ARCHANA 2.jpg'
import siteTemplate from './partials/site.html?raw'
import collectionCardTemplate from './partials/collection-card.html?raw'
import principleItemTemplate from './partials/principle-item.html?raw'
import spaceCardTemplate from './partials/space-card.html?raw'

const collections = [
  {
    title: 'Material Narratives',
    image: '/og_images/141060_00eb68f6c1344ce8aeff465df9c6f794~mv2.avif',
    text: 'Woodgrain, woven fibres and soft metallic notes come together in layered compositions designed to feel tactile before they are touched.',
    creditName: 'Margo Selby',
    creditUrl: 'https://www.margoselby.com',
  },
  {
    title: 'Colour Drift',
    image: '/og_images/ol-03-empyrea-paloma-f7590.webp',
    text: 'A flamboyant design featuring ferns and stylised paisley fronds is digitally printed and embellished with embroidered knots and running stitches.',
    creditName: 'Osborne and Little',
    creditUrl: 'https://www.osborneandlittle.com',
  },
  {
    title: 'Hand Loom Studies',
    image: '/og_images/CUSHION-ZEUS-TERRACOTTA-50x50-S.jpg.webp',
    text: 'Square decorative cushion with Fondant satin in the back and limited-edition trimming. Zeus, also known as the Imperial Zebra is a Grévy that was discovered in West Africa.',
    creditName: 'Aldeco Interiors',
    creditUrl: 'https://aldeco.pt/',
  },
]

const principles = [
  'Original wallcovering concepts for residential and boutique commercial interiors.',
  'Sample-led process with palette boards, finish studies and in-room mockups.',
  'Scaled support from first material direction through final styling decisions.',
]

const spaces = [
  {
    title: 'Jessamine - red, green',
    image: 'og_images/F4785-01_m.jpg',
    creditName: 'Cowtan & Tout',
    creditUrl: 'https://designs.cowtan.com/',
  },
  {
    title: 'Jessamine - pink, leaf',
    image: 'og_images/F4785-02_m.jpg',
    creditName: 'Cowtan & Tout',
    creditUrl: 'https://designs.cowtan.com/',
  },
]

const renderTemplate = (template, replacements) =>
  Object.entries(replacements).reduce(
    (output, [key, value]) => output.replaceAll(`{{${key}}}`, value),
    template,
  )

const collectionsHtml = collections
  .map((collection) => renderTemplate(collectionCardTemplate, {
    creditName: '',
    creditUrl: '',
    ...collection,
    creditHidden: collection.creditName && collection.creditUrl ? '' : 'hidden',
  }))
  .join('')

const principlesHtml = principles
  .map((principle, index) =>
    renderTemplate(principleItemTemplate, {
      index: `0${index + 1}`,
      text: principle,
    }),
  )
  .join('')

const spacesHtml = spaces
  .map((space) => renderTemplate(spaceCardTemplate, space))
  .join('')

document.querySelector('#app').innerHTML = renderTemplate(siteTemplate, {
  archanaPhoto,
  collections: collectionsHtml,
  principles: principlesHtml,
  spaces: spacesHtml,
})

const teamStatus = document.querySelector('#team-status')
const supportedPhotoTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])

document.querySelectorAll('.team-photo-picker input').forEach((input) => {
  const slot = input.closest('.team-photo-picker')
  let photoUrl

  input.addEventListener('change', () => {
    const file = input.files[0]
    if (!file) return
    input.value = ''
    if (!supportedPhotoTypes.has(file.type) || file.size > 10 * 1024 * 1024) {
      teamStatus.textContent = 'Choose a JPG, PNG, WebP, GIF or AVIF image up to 10 MB.'
      return
    }

    const nextPhotoUrl = URL.createObjectURL(file)
    const image = document.createElement('img')
    image.alt = `Team photo: ${file.name.replace(/\.[^.]+$/, '')}`
    image.addEventListener('load', () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl)
      photoUrl = nextPhotoUrl
      slot.querySelector('img')?.remove()
      slot.append(image)
      input.setAttribute('aria-label', 'Replace team photo')
      slot.title = 'Replace team photo'
      teamStatus.textContent = 'Photo selected. Local preview only.'
    }, { once: true })
    image.addEventListener('error', () => {
      URL.revokeObjectURL(nextPhotoUrl)
      teamStatus.textContent = 'This photo could not be opened. Please choose another image.'
    }, { once: true })
    image.src = nextPhotoUrl
  })
})
