// Definizione dei nodi
const nodes = [
  { id: 0, name: "A", content: {} },
  { id: 1, name: "B", content: {} },
  { id: 2, name: "C", content: {} },
  { id: 3, name: "D", content: {} }
];

// Matrice dei pesi (grafo non orientato)
const weightMatrix = [
  [0, 2, Infinity, 1],
  [2, 0, 3, Infinity],
  [Infinity, 3, 0, 4],
  [1, Infinity, 4, 0]
];

// Funzione che restituisce i lati adiacenti a un nodo
function getAdjacentEdges(matrix, u) {
  const edges = [];

  for (let v = 0; v < matrix[u].length; v++) {
    if (matrix[u][v] !== 0 && matrix[u][v] !== Infinity) {
      edges.push({
        u: u,
        v: v,
        w: matrix[u][v]
      });
    }
  }

  return edges;
}

// Test
console.log("Lati adiacenti al nodo 0:");
console.log(getAdjacentEdges(weightMatrix, 0));