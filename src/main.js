import './style.css'
import siteTemplate from './partials/site.html?raw'
import collectionCardTemplate from './partials/collection-card.html?raw'
import principleItemTemplate from './partials/principle-item.html?raw'
import spaceCardTemplate from './partials/space-card.html?raw'

const collections = [
  {
    title: 'Material Narratives',
    image: '/images/panel-study.jpg',
    text: 'Woodgrain, woven fibres and soft metallic notes come together in layered compositions designed to feel tactile before they are touched.',
  },
  {
    title: 'Colour Drift',
    image: '/images/material-layout.jpg',
    text: 'Muted sage, sand, clay and smoke tones are arranged with deliberate pacing so the rooms read calm from a distance and rich up close.',
  },
  {
    title: 'Hand Loom Studies',
    image: '/images/canoe-rolls.jpg',
    text: 'Surface patterns borrow from weaving, carved rhythm and botanical line work to create a collection suited to warm hospitality spaces.',
  },
]

const principles = [
  'Original wallcovering concepts for residential and boutique commercial interiors.',
  'Sample-led process with palette boards, finish studies and in-room mockups.',
  'Scaled support from first material direction through final styling decisions.',
]

const spaces = [
  {
    title: 'Dining alcoves with depth',
    image: '/images/dining-room.jpg',
  },
  {
    title: 'Living rooms with softened light',
    image: '/images/lounge-room.jpg',
  },
]

const renderTemplate = (template, replacements) =>
  Object.entries(replacements).reduce(
    (output, [key, value]) => output.replaceAll(`{{${key}}}`, value),
    template,
  )

const collectionsHtml = collections
  .map((collection) => renderTemplate(collectionCardTemplate, collection))
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
  collections: collectionsHtml,
  principles: principlesHtml,
  spaces: spacesHtml,
})
