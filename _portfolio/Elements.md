---
url: "portfolio/Elemants.md"
layout: portfolio
title: "Circle-packed chemical elements"
type: "d3"
subtype: "circle packing"
image: "/assets/images/AllCampaignClouds.PNG"
description: "Circle-packed Chemical Elements"
date: 2022-01-08 16:02:22 -0800
---

<!-- Circle Packing -->

<html>
	<head>
    <title>The Chemical Elements</title>
		<meta charset='utf-8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--<script src="node_modules/d3/dist/d3.min.js"></script>-->
    <!--<script src="node_modules/d3-array/dist/d3-array.min.js"></script>-->
		<script src='https://d3js.org/d3.v5.min.js'></script>
    <script src='assets\js\appOneLevel.js'></script>
    <!-- <link rel="stylesheet" href="style.css" /> -->
		<!--<script src='C:\AllThingsData\Projects\d3\Source\v6\d3.min.js'></script>-->
	</head>

  <body>
    <!-- Chart container -->

   <div class="header">
    <h1>The Elements by Group & Atomic Weight</h1>
  </div>

  <div class="circle-pack-container"></div>

  <!-- This is your tooltip -->
  <div class="tooltip">
    <table class="tip-table">
      <tr>
        <td>Name</td>
        <td class="name"></td>
      </tr>
      <tr>
        <td>Group</td>
        <td class="group"></td>
      </tr>
      <tr>
        <td>Atomic Wt</td>
        <td class="awt"></td>
      </tr>
    </table>
  </div>
</body>
</html>