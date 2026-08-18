export type PolicyRegion = {
  id: string
  code: string
  name: string
  subject: string
  detail: string
  signal: string
  color: string
  coordinates: [number, number]
}

export const policyRegions: PolicyRegion[] = [
  {
    id: 'europe',
    code: 'EU–01',
    name: 'Europe',
    subject: 'Multilateralism',
    detail: 'Institutions, alliances and a changing European security architecture.',
    signal: 'Institutional shift',
    color: '#b8d86a',
    coordinates: [12, 50],
  },
  {
    id: 'mena',
    code: 'ME–02',
    name: 'MENA',
    subject: 'Climate & energy',
    detail: 'Energy transitions and the regional politics shaping climate resilience.',
    signal: 'Transition watch',
    color: '#e6a654',
    coordinates: [43, 27],
  },
  {
    id: 'south',
    code: 'GS–03',
    name: 'Global South',
    subject: 'Equitable growth',
    detail: 'Development pathways built around agency, access and shared prosperity.',
    signal: 'Growth horizon',
    color: '#74c5a4',
    coordinates: [22, -17],
  },
  {
    id: 'indo',
    code: 'IP–04',
    name: 'Indo-Pacific',
    subject: 'Security & trade',
    detail: 'Strategic competition, maritime security and resilient trade networks.',
    signal: 'Priority theatre',
    color: '#d6edbd',
    coordinates: [108, 10],
  },
]
