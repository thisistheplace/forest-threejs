function getTreeLocations(ntrees, x, z, spacing){
  const randomVector = (p, q, offset) => [(Math.random() < 0.5 ? -1 : 1) * Math.random() * p * offset, 0, (Math.random() < 0.5 ? -1 : 1) * Math.random() * q * offset]
  const randomEuler = () => [0, Math.random() * Math.PI, 0]
  return Array.from({ length: ntrees }, (p=x, q=z, offset=spacing) => ({ position: randomVector(p, q, offset), rotation: randomEuler() }))
}

export { getTreeLocations }