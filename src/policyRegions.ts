export type PolicyRegion = {
  id: string
  name: string
  subject: string
  color: string
  point: [number, number, number]
}

export const policyRegions: PolicyRegion[] = [
  { id: 'europe', name: 'Europe', subject: 'Multilateralism', color: '#5568ff', point: [-0.15, 0.7, 1.32] },
  { id: 'mena', name: 'MENA', subject: 'Climate & energy', color: '#ff633f', point: [0.27, 0.18, 1.46] },
  { id: 'south', name: 'Global South', subject: 'Equitable growth', color: '#06b9a8', point: [-0.08, -0.82, 1.22] },
  { id: 'indo', name: 'Indo-Pacific', subject: 'Security & trade', color: '#b7da38', point: [1.13, -0.05, 0.92] },
]
