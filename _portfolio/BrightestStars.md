---
url: "/site/portfolio/ClosestStars/index.html"
layout: portfolio
title: "20 Brightest Extrasolar Stars as Seen from Earth"
type: "d3"
subtype: "Interactive"
image: "/assets/images/BrightestStars.PNG"
description: "A bar chart displaying apparent magnitude,&nbsp absolute magnitude,&nbsp and distance from Earth of the 20 brightest extrasolar stars.&nbspThe absolute magnitude of the Sun is 4.83,&nbspabout the same as Alpha Centauri. 
<br><br>
App Mag:  &nbspApparent magnitude.  &nbspThe brightness as seen from Earth. 
<br><br>
Abs Mag: &nbspAbsolute Magnitude.  &nbspThe brightness from 10 parsecs (32.6 light-years). 
<br><br>
Distance LY:  &nbspThe distance from Earth in light-years. 
<br><br>
Note that lower magnitude is brighter."
date: 2022-01-02 16:02:22 -0800
---

<html>

<head>
		<meta charset="UTF-8"/>
		<meta name='viewport' path1tent='width=device-width,initial-scale=1.0'/>
		<script src='https://d3js.org/d3.v6.min.js'> </script>
</head>
	



  <body>
    <!-- Chart container -->
    <div class='bar-chart-container'></div> 

  <!-- Controls -->
  <div class='controls'>
      <button data-name='Apparent Magnitude'>App Mag</button>
      <button data-name='Absolute Magnitude'>Abs Mag</button>
      <button data-name='Distance Light Years'>Distance LY</button>
    </div>
     <!-- Javascript logic -->
     <script>
     var data = [
  {
    "Name": "Deneb",
    "Astronomical Name": "Alpha Cygni",
    "Apparent Magnitude": 1.25,
    "Absolute Magnitude": -8.73,
    "Distance Light Years": 1467
  },
 {
   "Name": "Rigel",
   "Astronomical Name": "Beta Orionis",
   "Apparent Magnitude": 0.18,
   "Absolute Magnitude": -6.69,
   "Distance Light Years": 773
 },
 {
   "Name": "Antares",
   "Astronomical Name": "Alpha Scorpii",
   "Apparent Magnitude": 1.06,
   "Absolute Magnitude": -5.28,
   "Distance Light Years": 604
 },
 {
   "Name": "Hadar",
   "Astronomical Name": "Beta Centauri",
   "Apparent Magnitude": 0.61,
   "Absolute Magnitude": -5.42,
   "Distance Light Years": 526
 },
 {
   "Name": "Betelgeuse",
   "Astronomical Name": "Alpha Orionis",
   "Apparent Magnitude": 0.45,
   "Absolute Magnitude": -5.14,
   "Distance Light Years": 522
 },
{
   "Name": "Mimosa",
   "Astronomical Name": "Beta Crucis",
   "Apparent Magnitude": 1.25,
   "Absolute Magnitude": -3.92,
   "Distance Light Years": 352
 },
 {
   "Name": "Acrux",
   "Astronomical Name": "Alpha Crucis",
   "Apparent Magnitude": 0.77,
   "Absolute Magnitude": -4.19,
   "Distance Light Years": 321
 },
 {
   "Name": "Canopus",
   "Astronomical Name": "Alpha Carinae",
   "Apparent Magnitude": -0.62,
   "Absolute Magnitude": -5.53,
   "Distance Light Years": 313
 },
 {
   "Name": "Spica",
   "Astronomical Name": "Alpha Virginis",
   "Apparent Magnitude": 0.98,
   "Absolute Magnitude": -3.55,
   "Distance Light Years": 262
 },
 {
   "Name": "Achernar",
   "Astronomical Name": "Alpha Eridani",
   "Apparent Magnitude": 0.45,
   "Absolute Magnitude": -2.77,
   "Distance Light Years": 144
 },
 {
   "Name": "Aldebaran",
   "Astronomical Name": "Alpha Tauri",
   "Apparent Magnitude": 0.87,
   "Absolute Magnitude": -0.63,
   "Distance Light Years": 65
 },
 {
   "Name": "Capella",
   "Astronomical Name": "Alpha Aurigae",
   "Apparent Magnitude": 0.08,
   "Absolute Magnitude": -0.48,
   "Distance Light Years": 42
 },
 {
   "Name": "Arcturus",
   "Astronomical Name": "Alpha Bootis",
   "Apparent Magnitude": -0.05,
   "Absolute Magnitude": -0.31,
   "Distance Light Years": 37
 },
 {
   "Name": "Pollux",
   "Astronomical Name": "Beta Geminorum",
   "Apparent Magnitude": 1.16,
   "Absolute Magnitude": 1.09,
   "Distance Light Years": 34
 },
 {
   "Name": "Vega",
   "Astronomical Name": "Alpha Lyrae",
   "Apparent Magnitude": 0.03,
   "Absolute Magnitude": 0.58,
   "Distance Light Years": 25
 },
 {
   "Name": "Fomalhaut",
   "Astronomical Name": "Alpha Piscis Austrini",
   "Apparent Magnitude": 1.17,
   "Absolute Magnitude": 1.74,
   "Distance Light Years": 25
 },
 {
   "Name": "Altair",
   "Astronomical Name": "Alpha Aquilae",
   "Apparent Magnitude": 0.76,
   "Absolute Magnitude": 2.2,
   "Distance Light Years": 17
 },
 {
   "Name": "Procyon",
   "Astronomical Name": "Alpha Canis Minoris",
   "Apparent Magnitude": 0.4,
   "Absolute Magnitude": 2.68,
   "Distance Light Years": 11
 },
  {
   "Name": "Sirius",
   "Astronomical Name": "Alpha Canis Majoris",
   "Apparent Magnitude": -1.44,
   "Absolute Magnitude": 1.45,
   "Distance Light Years": 9
 },
 {
   "Name": "Alpha Centauri",
   "Astronomical Name": "Rigel Kentaurus",
   "Apparent Magnitude": -0.01,
   "Absolute Magnitude": 4.34,
   "Distance Light Years": 4
 }
 ]
// Main function.
  let metric = 'Distance Light Years';
  // Click handler.
  function click() {
    metric = this.dataset.name;
    const updatedData = data
    .sort((a, b) => b[metric] - a[metric]);
    update(updatedData);
  }
  // General Update Pattern.
  function update(data) {
    // Update scales.
    const mmin = d3.min(data, d => d[metric]);
    const mmax = d3.max(data, d => d[metric]);
    xScale.domain([mmin < 0 ? 1.1 * mmin : -10, mmax]);
    yScale.domain(data.map(d => d.Name));
    // Set up transition.
    const dur = 1000;
    const t = d3.transition().duration(dur);
    // Update bars.
    bars
      .selectAll('.bar')
      .data(data, d => d.Name)
      .join(
        enter => {
          enter
            .append('rect')
            .attr('class', 'bar')
            .attr('y', d => yScale(d.Name))
            .attr('height', yScale.bandwidth())
            .style('fill', 'dodgerblue')
            .transition(t)
            .delay((d, i) => i * 20)
            .attr('width', d => xScale(d[metric]))
            .style('fill', 'dodgerblue');
        },
         update => {
          update
            .transition(t)
            .delay((d, i) => i * 20)
            .attr('y', d => yScale(d.Name))
            .attr('width', d => xScale(d[metric]));
        },
       exit => {
          exit
            .transition()
            .duration(dur / 2)
            .style('fill-opacity', 0)
            .remove();
        }
      );
    // Update Axes.
    xAxisDraw.transition(t).call(xAxis.scale(xScale));
    yAxisDraw.transition(t).call(yAxis.scale(yScale));
    yAxisDraw.selectAll('text').attr('dx', '-0.6em');
    // Update header.
    //headline.text(`${metric}`)
         //   .style('fill','lightgray' );
  }
  // Margin convention.
  const margin = { top: 20, right: 20, bottom: 20, left: 80 };
  const width = 550 - margin.right - margin.left;
  const height = 400 - margin.top - margin.bottom;
  // Scales.
  const xScale = d3.scaleLinear().range([0, width]);
  const yScale = d3
    .scaleBand()
    .rangeRound([height, 0])
    .paddingInner(0.25);
  // Draw base.
  const svg = d3
    .select('.bar-chart-container')
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  // Draw header.
  const header = svg
    .append('g')
    .attr('class', 'bar-header')
    .attr('transform', `translate(0,${-margin.top * 0.6})`)
    .append('text');
  const headline = header.append('tspan');
  header
    .append('tspan')
    .attr('x', 0)
    .attr('dy', '1.5em')
    .style('font-size', '.0em')
    .style('fill', 'lightgray')
   // .text('20 brightest extrasolar stars as seen from Earth');
  // Draw Bars.
  const bars = svg.append('g').attr('class', 'bars');
  // Draw x axis.
  const xAxis = d3
    .axisTop(xScale)
    .ticks(5)
    .tickSizeInner(-height)
    .tickSizeOuter(0);
  const xAxisDraw = svg.append('g').attr('class', 'x axis');
  // Draw y axis.
  const yAxis = d3.axisLeft(yScale).tickSize(0);
  const yAxisDraw = svg.append('g').attr('class', 'y axis');
  // Initial bar render.
  const starData = data
update(starData);
  // Listen to click events.
  d3.selectAll('button').on('click', click);
     </script>
    </body>
</html>