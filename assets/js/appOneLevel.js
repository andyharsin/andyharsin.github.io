// Circle Packing

//Type conversion.
const parseStringNA = string => (string === 'NA' ? undefined : string);
const parseNumberNA = number => (number === 'NA' ? null : +number);

function type(d) {
  return {
    ID: +d.ID,
    name: parseStringNA(d.name),
    parent: parseStringNA(d.parent),
    symbol: parseStringNA(d.symbol),
    number: parseNumberNA(d.number),
    awt: parseNumberNA(d.awt)
  };
}

// Main function.
function ready(elements) {

  // Interactivity.
  function mouseover() { 
    const nodeData = d3.select(this).data()[0].data;
    const tip = d3.select('.tooltip');
    tip
    .style('top', `${d3.event.clientY + 5}px`)
    .style('left', `${d3.event.clientX + 10}px`)
      .transition()
      .style('opacity', 0.9); 

    tip.select('.name').html(nodeData.name);
    tip.select('.group').html(nodeData.group);
    tip.select('.awt').html(nodeData.awt);
  }

  function mousemove() {
    d3.select('.tooltip')
    .style('top', `${d3.event.clientY + 5}px`)
    .style('left', `${d3.event.clientX + 10}px`);
  }

  function mouseout() {
    d3.select('.tooltip')
      .transition()
      .style('opacity', 0);
  }

  // Set dimensions.
  const margin = { top: 40, right: 40, bottom: 40, left: 40 };
  const width = 680 - margin.right - margin.left;
  const height = 680 - margin.top - margin.bottom;

  // Stratify data into hierarchy.
  const stratify = d3
    .stratify()
    .id(d => d.name)
    .parentId(d => d.parent);

  const elemHierarchy = stratify(elements);


  // Sum and sort data.
  //elemHierarchy.sum(d => d.awt).sort((a, b) => b.height - a.height || b.value - a.value);

  elemHierarchy.sum(d => d.awt).sort((a, b) => b.value - a.value);


  // Circle pack layout.
  const packLayout = d3
    .pack()
    .size([width, height])
    .padding(20);

  packLayout(elemHierarchy);

  // Flatten the nodes for the visualisation.
  const nodes = elemHierarchy.descendants();

  console.log(nodes);

// Draw base.
  const svg = d3
    .select('.circle-pack-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const groups = ['diatomic nonmetal', 'noble gas', 'alkali metal', 'alkaline earth metal', 'metalloid', 
  'polyatomic nonmetal', 'post-transition metal', 'transition metal', 'lanthanide', 'actinide'];

  const color = d3
  .scaleOrdinal()
  .domain(groups)
  .range([
    '#ffe',
    '#2220C2',
    '#FF8040',
    '#E56717',
    '#FF00FF',
    '#347C17',
    '#DC381F',
    '#9F000F',
    '#8D38C9',
    '#6A287E'
  ]);

  // Draw pack.
  const pack = svg
    .selectAll('.node')
    .data(nodes)
    .join('circle')
    .attr('class', 'node')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.r+3)
    .style('fill', d => (color(d.data.group)))
    .style('fill-opacity', d => (d.children ? 0.9 : 0.7))
    .style('stroke-width', d => (d.depth === 1 ? 1 : 0))
    .style('stroke', '#333')
    .filter(d => !d.children)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);

    const label = svg
       .selectAll('.sym')
        .data(nodes)
        .join('text')
        .attr('class', 'sym')
        .attr('text-anchor', 'middle')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('font-size', d => d.r*1.3)
        .attr('dominant-baseline', 'middle')
        .text(d => d.data.symbol)
        .style('fill', '#111')
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

  }

// Load data.
/*const elemData = d3.csv('C:/Users/Andy/Desktop/DT/andyharsin.github.io/_data/element_dataL1.csv').then(res => {ready(res);
});*/

const elemData = d3.csv('data/element_dataL1.csv').then(res => {ready(res);
});