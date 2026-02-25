export type Category = {
  type: string
  label: string
  sub?: { id: string; label: string }[]
}

export const categories: Category[] = [
  {
    type: 'film',
    label: 'Films',
    sub: [
      { id: 'feature', label: 'Feature' },
      { id: 'short', label: 'Short' },
      { id: 'documentary', label: 'Documentary' },
      { id: 'animation', label: 'Animation' },
      { id: 'experimental', label: 'Experimental' },
      { id: 'noir', label: 'Noir' },
      { id: 'silent', label: 'Silent' },
      { id: 'festival', label: 'Festival' },
      { id: 'arthouse', label: 'Art-house' },
    ],
  },
  {
    type: 'music',
    label: 'Music',
    sub: [
      { id: 'rock', label: 'Rock' },
      { id: 'pop', label: 'Pop' },
      { id: 'jazz', label: 'Jazz' },
      { id: 'classical', label: 'Classical' },
      { id: 'electronic', label: 'Electronic' },
      { id: 'hiphop', label: 'Hip-hop' },
      { id: 'folk', label: 'Folk' },
      { id: 'ambient', label: 'Ambient' },
      { id: 'soundtrack', label: 'Soundtrack' },
    ],
  },
  {
    type: 'software',
    label: 'Software',
    sub: [
      { id: 'desktop', label: 'Desktop' },
      { id: 'web', label: 'Web' },
      { id: 'mobile', label: 'Mobile' },
      { id: 'libraries', label: 'Libraries' },
      { id: 'cli', label: 'CLI' },
      { id: 'frameworks', label: 'Frameworks' },
      { id: 'plugins', label: 'Plugins' },
    ],
  },
  {
    type: 'game',
    label: 'Games',
    sub: [
      { id: 'indie', label: 'Indie' },
      { id: 'aaa', label: 'AAA' },
      { id: 'retro', label: 'Retro' },
      { id: 'mobile', label: 'Mobile' },
      { id: 'tabletop', label: 'Tabletop' },
      { id: 'vr', label: 'VR' },
      { id: 'pc', label: 'PC' },
      { id: 'console', label: 'Console' },
    ],
  },
  {
    type: 'book',
    label: 'Books',
    sub: [
      { id: 'fiction', label: 'Fiction' },
      { id: 'nonfiction', label: 'Non-fiction' },
      { id: 'poetry', label: 'Poetry' },
      { id: 'essays', label: 'Essays' },
      { id: 'textbook', label: 'Textbook' },
      { id: 'reference', label: 'Reference' },
      { id: 'children', label: 'Children' },
    ],
  },
  {
    type: 'asset',
    label: 'Assets',
    sub: [
      { id: 'textures', label: 'Textures' },
      { id: 'models', label: '3D Models' },
      { id: 'audio', label: 'Audio' },
      { id: 'fonts', label: 'Fonts' },
      { id: 'icons', label: 'Icons' },
      { id: 'templates', label: 'Templates' },
      { id: 'photos', label: 'Photos' },
    ],
  },
]

export default categories
