function createChessboardGraph(n, m) {
  const nodes = [];
  const adjacencyList = new Map();

  // Creazione nodi
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const id = `${i},${j}`;
      nodes.push({ i, j });
      adjacencyList.set(id, []);
    }
  }

  // Movimenti consentiti
  const directions = [
    [-1, 0], // su
    [1, 0],  // giù
    [0, -1], // sinistra
    [0, 1]   // destra
  ];

  // Creazione lati
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const from = `${i},${j}`;

      for (const [dx, dy] of directions) {
        const ni = i + dx;
        const nj = j + dy;

        if (ni >= 0 && ni < n && nj >= 0 && nj < m) {
          const to = `${ni},${nj}`;
          adjacencyList.get(from).push(to);
        }
      }
    }
  }

  return { nodes, adjacencyList };
}

// Test
const graph = createChessboardGraph(3, 4);
console.log("Adiacenti a (1,1):", graph.adjacencyList.get("1,1"));