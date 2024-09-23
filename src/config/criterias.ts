export type CriteriaType = 'given' | 'when' | 'then'

interface DictionaryCriteriaItem {
  types: CriteriaType[]
  text: string
}

export const criteriaDictionary: DictionaryCriteriaItem[] = [
  {
    text: "je suis sur l'écran",
    types: ['given'],
  },
  {
    text: 'je suis connecté',
    types: ['given'],
  },
  {
    text: 'je clique sur le bouton',
    types: ['when'],
  },
  {
    text: 'je clique sur le lien',
    types: ['when'],
  },
  {
    text: 'je vais sur la page',
    types: ['when'],
  },
  {
    text: "je vois l'écran",
    types: ['then'],
  },
  {
    text: 'je vois les éléments suivants :',
    types: ['then'],
  },
  {
    text: "je vois un écran d'erreur générique",
    types: ['then'],
  },
  {
    text: 'un événement AT internet "à définir" est envoyé',
    types: ['then'],
  },
  {
    text: "je suis redirigé vers l'adview",
    types: ['then'],
  },
  {
    text: 'je suis redirigé vers la messagerie',
    types: ['then'],
  },
  {
    text: "j'ai reçu un system message",
    types: ['given', 'then'],
  },
]
