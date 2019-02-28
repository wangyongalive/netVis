//node ids are in order in which nodes come in existence
let mynodes = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
]
let mylinks = [
  {
    source: 0,
    target: 1
  },
  {
    source: 0,
    target: 2
  },
  {
    source: 1,
    target: 2
  }
]

export function build() {

  if (mynodes.length == 0 || mylinks.length == 0) {
    mylinks = [
      {
        source: 0,
        target: 1
      },
      {
        source: 0,
        target: 2
      },
      {
        source: 1,
        target: 2
      }
    ]
    mynodes = [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      }
    ]
  }
//universal width and height let index.htm control svg dimensions when needed
  let lastNodeId = mynodes.length;
  let w = 240,
    h = 240,
    rad = 5;

  let svg = d3.select("#svg-wrap")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr('id', 'buildGraph')


  let dragLine = svg.append("path")
    .attr("class", "dragLine hidden")
    .attr("d", "M0,0L0,0");

  let edges = svg.append("g")
    .selectAll(".edge");

  let vertices = svg.append("g")
    .selectAll(".vertex");

  let force = d3.layout.force()
    .nodes(mynodes)
    .links(mylinks)
    .size([w, h])
    .linkDistance(60)
    .linkStrength(0.9)
    .charge(-500)
    .chargeDistance((w + h) / 2)
    .gravity(0.12)
    .on("tick", tick)
    .start();

  let colors = d3.scale.category10();

  let mousedownNode = null,
    mouseupNode = null;


  function resetMouseVar() {
    mousedownNode = null;
    mouseupNode = null;
  }

//update the simulation
  function tick() {
    edges.attr("x1", function (d) {
      return d.source.x;
    })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    vertices.attr("cx", function (d) {
      return d.x;
    })
      .attr("cy", function (d) {
        return d.y;
      });

  }

  function addNode() {
    if (d3.event.button == 0) {
      let coords = d3.mouse(this);
      let newNode = {
        x: coords[0],
        y: coords[1],
        id: ++lastNodeId,
      };
      mynodes.push(newNode);
      restart();
    }
  }

  function removeNode(d, i) {
    //to make ctrl-drag works for mac/osx users
    if (d3.event.ctrlKey) return;
    mynodes.splice(mynodes.indexOf(d), 1);
    let linksToRemove = mylinks.filter(function (l) {
      return l.source === d || l.target === d;
    });
    linksToRemove.map(function (l) {
      mylinks.splice(mylinks.indexOf(l), 1);
    });
    d3.event.preventDefault();
    restart();
  }

  function removeEdge(d, i) {
    mylinks.splice(mylinks.indexOf(d), 1);
    d3.event.preventDefault();
    restart();
  }

  function beginDragLine(d) {
    //to prevent call of addNode through svg
    d3.event.stopPropagation();
    //to prevent dragging of svg in firefox
    d3.event.preventDefault();
    if (d3.event.ctrlKey || d3.event.button != 0) return;
    mousedownNode = d;
    dragLine.classed("hidden", false)
      .attr("d", "M" + mousedownNode.x + "," + mousedownNode.y +
        "L" + mousedownNode.x + "," + mousedownNode.y);
  }

  function updateDragLine() {
    if (!mousedownNode) return;
    dragLine.attr("d", "M" + mousedownNode.x + "," + mousedownNode.y +
      "L" + d3.mouse(this)[0] + "," + d3.mouse(this)[1]);
  }

  function hideDragLine() {
    dragLine.classed("hidden", true);
    resetMouseVar();
    restart();
  }

//no need to call hideDragLine() and restart() in endDragLine
//mouseup on vertices propagates to svg which calls hideDragLine
  function endDragLine(d) {
    if (!mousedownNode || mousedownNode === d) return;
    //return if link already exists
    for (let i = 0; i < mylinks.length; i++) {
      let l = mylinks[i];
      if ((l.source === mousedownNode && l.target === d) || (l.source === d && l.target === mousedownNode)) {
        return;
      }
    }
    let newLink = {
      source: mousedownNode,
      target: d
    };
    mylinks.push(newLink);
  }

//one response per ctrl keydown
  let lastKeyDown = -1;

  function keydown() {
    if (lastKeyDown !== -1) return;
    lastKeyDown = d3.event.key;

    if (lastKeyDown === "Control") {
      vertices.call(force.drag);
    }
  }

  function keyup() {
    lastKeyDown = -1;
    if (d3.event.key === "Control") {
      vertices.on("mousedown.drag", null);
    }
  }


//updates the graph by updating links, nodes and binding them with DOM
//interface is defined through several events
  function restart() {
    edges = edges.data(mylinks, function (d) {
      return "v" + d.source.id + "-v" + d.target.id;
    })
    edges.enter()
      .append("line")
      .attr("class", "edge")
      .on("mousedown", function () {
        d3.event.stopPropagation();
      })
      .on("contextmenu", removeEdge)
      .append("title")
      .text(function (d) {
        return "v" + d.source.id + "-v" + d.target.id;
      });
    edges.exit().remove();

    //vertices are known by id
    vertices = vertices.data(mynodes, function (d) {
      return d.id;
    });

    vertices.enter()
      .append("circle")
      .attr("r", rad)
      .attr("class", "vertex")
      .style("fill", function (d, i) {
        return colors(d.id);
      })
      .on("mousedown", beginDragLine)
      .on("mouseup", endDragLine)
      .on("contextmenu", removeNode)
      .append("title")
      .text(function (d) {
        return "v" + d.id;
      });

    vertices.exit().remove();
    force.start();
  }

//further interface
  svg.on("mousedown", addNode)
    .on("mousemove", updateDragLine)
    .on("mouseup", hideDragLine)
    .on("contextmenu", function () {
      d3.event.preventDefault();
    })
    .on("mouseleave", hideDragLine);

  d3.select(window)
    .on('keydown', keydown)
    .on('keyup', keyup);
  restart();
}

export function getNodeLinkData() {
  return {'node': mynodes, 'link': mylinks}
}

export function emptyNodeLinkData() {
  mylinks = []
  mynodes = []
}

export function isempty() {
  return (mylinks.length == 0 || mynodes.length == 0) ? true : false
}

