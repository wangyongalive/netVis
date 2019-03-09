// 右键删除 左键添加
let mynodes = [{
  id: 1
}, {
  id: 2
}, {
  id: 3
}]
let mylinks = [{
  source: 0,
  target: 1
}, {
  source: 0,
  target: 2
}, {
  source: 1,
  target: 2
}]

export function build() {
  // 当网络为空时
  if (mynodes.length == 0 || mylinks.length == 0) {
    mylinks = [{
      source: 0,
      target: 1
    }, {
      source: 0,
      target: 2
    }, {
      source: 1,
      target: 2
    }]
    mynodes = [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }]
  }

  let lastNodeId = mynodes.length;
  let w = 240, h = 240, rad = 5;

  let svg = d3.select("#svg-wrap")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr('id', 'buildGraph');


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

  let mousedownNode = null, mouseupNode = null;


  function resetMouseVar() {
    mousedownNode = null;
    mouseupNode = null;
  }

  //  tick
  function tick() {
    // 边
    edges.attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    // 节点
    vertices.attr("cx", d => d.x)
      .attr("cy", d => d.y);

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

  function removeNode(d) {
    // 删除节点
    mynodes.splice(mynodes.indexOf(d), 1);
    // 删除边
    let linksToRemove = mylinks.filter(function (l) {
      return l.source === d || l.target === d;
    });
    linksToRemove.map(function (l) {
      mylinks.splice(mylinks.indexOf(l), 1);
    });
    // 阻止默认事件
    d3.event.preventDefault();
    restart();
  }

  function removeEdge(d) {
    mylinks.splice(mylinks.indexOf(d), 1);
    d3.event.preventDefault();
    restart();
  }

  function beginDragLine(d) {
    // to prevent call of addNode through svg
    d3.event.stopPropagation();
    // to prevent dragging of svg in firefox
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

// no need to call hideDragLine() and restart() in endDragLine
// mouseup on vertices propagates to svg which calls hideDragLine
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

// one response per ctrl keydown
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


  // 通过更新链接、节点并将它们与DOM绑定来更新图表
  function restart() {
    // 键函数  更新数据的对应规则
    edges = edges.data(mylinks, d => {
      return "v" + d.source.id + "-v" + d.target.id
    });

    edges.enter()
      .append("line")
      .attr("class", "edge")
      .on("mousedown", function () {
        d3.event.stopPropagation();
      })
      .on("contextmenu", removeEdge)
      .append("title")
      .text(d => "v" + d.source.id + "-v" + d.target.id);
    edges.exit().remove();

    // 节点
    // 更新节点的对应规则
    vertices = vertices.data(mynodes, d => d.id);
    vertices.enter()
      .append("circle")
      .attr("r", rad)
      .attr("class", "vertex")
      .style("fill", d => colors(d.id))
      .on("mousedown", beginDragLine)
      .on("mouseup", endDragLine)
      .on("contextmenu", removeNode)
      .append("title")
      .text(d => "v" + d.id);
    vertices.exit().remove();

    // 重新开始
    force.start();
  }

  // 画布上面注册的事件
  svg.on("mousedown", addNode)
    .on("mousemove", updateDragLine)
    .on("mouseup", hideDragLine)
    .on("contextmenu", () => {
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

