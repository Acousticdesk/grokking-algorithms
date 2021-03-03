const Queue = require('./queue')
const { pickKey, noop } = require('./utils')

const getGraphPath = (paths, to) => {
  let currentEdge = to
  const resultingPath = [to]

  while (paths[currentEdge]) {
    resultingPath.push(paths[currentEdge])
    currentEdge = paths[currentEdge]
  }

  return resultingPath.reverse().join(' > ')
}

const graph = {
  tommy: ['arthur', 'finn', 'grace'],
  arthur: ['finn', 'tommy'],
  grace: ['incognito', 'tommy'],
  finn: ['arthur', 'tommy'],
  incognito: ['campbell'],
}

const createTraverseGraphBreadthFirst = (subroutine = noop) => (graph, startFromEdge = pickKey(graph)) => {
  let currentEdge = startFromEdge
  const queue = new Queue()
  const visitedEdges = {}
  const paths = {}

  queue.enqueue(currentEdge)

  while (queue.read()) {
    queue.dequeue()

    visitedEdges[currentEdge] = true

    const currentEdgeVertexes = graph[currentEdge] || []

    for (let i = 0; i < currentEdgeVertexes.length; i += 1) {
      const edge = currentEdgeVertexes[i]

      if (visitedEdges[edge]) {
        break
      }

      paths[edge] = currentEdge

      if (subroutine(edge, paths)) {
        return edge
      }

      queue.enqueue(edge)
      visitedEdges[edge] = true
    }

    currentEdge = queue.read()
  }
}

const traverseGraphWithPathLogger = createTraverseGraphBreadthFirst((character, paths) => {
  if (character === 'campbell') {
    console.log(getGraphPath(paths, character))

    return true
  }
})

// traverseGraphWithPathLogger(graph)

const weightedGraph = {
  kiev: {
    odessa: 441,
    lviv: 468,
    rivne: 327,
  },
  rivne: {
    lviv: 62,
  },
  lviv: {
    odessa: 796,
  },
}

const setupDijkstrasAlgorithm = (subroutine = noop) => (graph) => (startFromEdge, targetEdge) => {
  let currentEdge = startFromEdge

  const cheapestPaths = {
    [startFromEdge]: 0,
    [targetEdge]: Infinity,
  }

  const cheapestPathsRelations = {}

  // todo akicha: prevent running the loop if currentEdge === targetEdge
  while (currentEdge) {
    let cheapestNeighbor = null

    const currentEdgeVertexes = graph[currentEdge] ? Object.keys(graph[currentEdge]) : []

    currentEdgeVertexes.forEach(edge => {
      const distanceToEdge = cheapestPaths[currentEdge] + graph[currentEdge][edge]

      if (!cheapestPaths[edge] || cheapestPaths[edge] > distanceToEdge) {
        cheapestPaths[edge] = distanceToEdge
        cheapestPathsRelations[edge] = currentEdge
      }

      if (!cheapestNeighbor || cheapestNeighbor.distance > graph[currentEdge][edge]) {
        cheapestNeighbor = { edge, distance: graph[currentEdge][edge] }
      }
    })

    currentEdge = cheapestNeighbor ? cheapestNeighbor.edge : null
  }

  subroutine(cheapestPathsRelations)
}

const dijkstrasAlgorithmWithPathLogger = setupDijkstrasAlgorithm(paths => console.log(getGraphPath(paths, 'lviv')))

// dijkstrasAlgorithmWithPathLogger(weightedGraph)('kiev', 'lviv')
