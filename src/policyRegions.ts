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
    id: 'atlantic',
    code: 'EA–01',
    name: 'Euro-Atlantic',
    subject: 'Alliances & security',
    detail: 'Alliance adaptation, deterrence and the institutions shaping European security.',
    signal: 'Security architecture',
    color: '#b8d86a',
    coordinates: [10, 50],
  },
  {
    id: 'west-asia',
    code: 'WA–02',
    name: 'West Asia',
    subject: 'Energy & regional order',
    detail: 'Energy corridors, regional competition and the diplomacy of a changing order.',
    signal: 'Regional realignment',
    color: '#e6a654',
    coordinates: [44, 27],
  },
  {
    id: 'global-south',
    code: 'GS–03',
    name: 'Global South',
    subject: 'Development & agency',
    detail: 'How emerging powers are reshaping development, institutions and global voice.',
    signal: 'Institutional agency',
    color: '#74c5a4',
    coordinates: [22, -17],
  },
  {
    id: 'indo-pacific',
    code: 'IP–04',
    name: 'Indo-Pacific',
    subject: 'Maritime security & trade',
    detail: 'Strategic competition, maritime chokepoints and resilient economic networks.',
    signal: 'Priority theatre',
    color: '#d6edbd',
    coordinates: [108, 10],
  },
]
