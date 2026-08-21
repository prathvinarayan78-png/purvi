export type WritingEntry = {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  status: 'placeholder'
}

export const writings: WritingEntry[] = [
  {
    slug: 'featured-policy-essay',
    category: 'Policy essay',
    title: 'Add Purvi’s featured essay title',
    excerpt: 'Add a concise abstract introducing the argument, geopolitical context and central policy question.',
    date: 'Date to add',
    readTime: 'Read time',
    status: 'placeholder',
  },
  {
    slug: 'regional-analysis',
    category: 'Regional analysis',
    title: 'Add a regional analysis title',
    excerpt: 'Use this card for analysis of a strategic theatre, emerging alignment or international institution.',
    date: 'Date to add',
    readTime: 'Read time',
    status: 'placeholder',
  },
  {
    slug: 'research-note',
    category: 'Research note',
    title: 'Add a research note title',
    excerpt: 'A shorter format for evidence, policy signals, book notes or an emerging line of inquiry.',
    date: 'Date to add',
    readTime: 'Read time',
    status: 'placeholder',
  },
  {
    slug: 'institutional-commentary',
    category: 'Commentary',
    title: 'Add an institutional commentary title',
    excerpt: 'Use this space for a timely perspective on diplomacy, multilateralism or global governance.',
    date: 'Date to add',
    readTime: 'Read time',
    status: 'placeholder',
  },
]
