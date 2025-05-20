const margin = {top: 40, right: 20, bottom: 70, left: 80};
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const color = d3.scaleOrdinal()
  .domain(["Male", "Female", "Other"])
  .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

function jitter(value) {
  return value + (Math.random() - 0.5) * 0.3;
}

const svg = d3.select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);
const r = d3.scaleSqrt().range([4, 20]);

const fisheye = d3.fisheye.circular()
  .radius(150)
  .distortion(3);

d3.csv("data/sleep_Fisheye.csv").then(data => {
  data.forEach(d => {
    d["Sleep Quality"] = +d["Sleep Quality"];
    d["Productivity Score"] = +d["Productivity Score"];
    d["Work Hours (hrs/day)"] = +d["Work Hours (hrs/day)"];
    d.jitterX = jitter(d["Sleep Quality"]);
    d.jitterY = jitter(d["Productivity Score"]);
  });

  x.domain(d3.extent(data, d => d.jitterX)).nice();
  y.domain(d3.extent(data, d => d.jitterY)).nice();
  r.domain(d3.extent(data, d => d["Work Hours (hrs/day)"])).nice();

  const xTicks = x.ticks(10);
  const yTicks = y.ticks(10);

  const xGrid = svg.selectAll(".x-grid")
    .data(xTicks)
    .enter()
    .append("line")
    .attr("class", "x-grid")
    .attr("x1", d => x(d))
    .attr("x2", d => x(d))
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke", "#ccc")
    .attr("stroke-opacity", 0.3);

  const yGrid = svg.selectAll(".y-grid")
    .data(yTicks)
    .enter()
    .append("line")
    .attr("class", "y-grid")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", d => y(d))
    .attr("y2", d => y(d))
    .attr("stroke", "#ccc")
    .attr("stroke-opacity", 0.3);

  const xAxisGroup = svg.append("g").attr("class", "x-ticks");
  const xLabels = xAxisGroup.selectAll("text")
    .data(xTicks)
    .enter()
    .append("text")
    .attr("y", height + 20)
    .attr("x", d => x(d))
    .attr("text-anchor", "middle")
    .text(d => d);

  const yAxisGroup = svg.append("g").attr("class", "y-ticks");
  const yLabels = yAxisGroup.selectAll("text")
    .data(yTicks)
    .enter()
    .append("text")
    .attr("x", -10)
    .attr("y", d => y(d))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .text(d => d);

  const circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.jitterX))
    .attr("cy", d => y(d.jitterY))
    .attr("r", d => r(d["Work Hours (hrs/day)"]))
    .attr("fill", d => color(d["Gender"]))
    .attr("opacity", 0.7);

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .text("Sleep Quality")
    .style("font-size", "14px")
    .style("fill", "#333");

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", `rotate(-90)`)
    .attr("x", -height / 2)
    .attr("y", -55)
    .text("Productivity Score")
    .style("font-size", "14px")
    .style("fill", "#333");

  svg.on("mousemove", function(event) {
    const [mx, my] = d3.pointer(event);
    fisheye.focus([mx, my]);

    // 更新圆点
    circles
      .attr("cx", d => fisheye({x: x(d.jitterX), y: y(d.jitterY)}).x)
      .attr("cy", d => fisheye({x: x(d.jitterX), y: y(d.jitterY)}).y);

    // 更新网格线
    xGrid
      .attr("x1", d => fisheye({x: x(d), y: height}).x)
      .attr("x2", d => fisheye({x: x(d), y: height}).x);

    yGrid
      .attr("y1", d => fisheye({x: 0, y: y(d)}).y)
      .attr("y2", d => fisheye({x: 0, y: y(d)}).y);

    // 更新坐标刻度
    xLabels
      .attr("x", d => fisheye({x: x(d), y: height}).x)
      .attr("y", height + 20);

    yLabels
      .attr("y", d => fisheye({x: 0, y: y(d)}).y);
  });
});
