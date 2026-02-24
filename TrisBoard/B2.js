// Matrice dei pesi del grafo
const weightMatrix = [
  [0, 2, Infinity, 1],
  [2, 0, 3, Infinity],
  [Infinity, 3, 0, 4],
  [1, Infinity, 4, 0]
];

// Algoritmo di Dijkstra
function dijkstra(matrix, source) {
  const n = matrix.length;
  const dist = new Array(n).fill(Infinity);
  const visited = new Array(n).fill(false);

  dist[source] = 0;

  for (let i = 0; i < n; i++) {
    let u = -1;
    let minDist = Infinity;

    // Trova il nodo non visitato con distanza minima
    for (let j = 0; j < n; j++) {
      if (!visited[j] && dist[j] < minDist) {
        minDist = dist[j];
        u = j;
      }
    }

    if (u === -1) break;
    visited[u] = true;

    // Aggiorna le distanze dei nodi adiacenti
    for (let v = 0; v < n; v++) {
      if (
        matrix[u][v] !== Infinity &&
        !visited[v] &&
        dist[u] + matrix[u][v] < dist[v]
      ) {
        dist[v] = dist[u] + matrix[u][v];
      }
    }
  }

  return dist;
}

// Test con diverse sorgenti
console.log("Distanze da nodo 0:", dijkstra(weightMatrix, 0));
console.log("Distanze da nodo 2:", dijkstra(weightMatrix, 2));