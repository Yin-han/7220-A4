// const margin = { top: 40, right: 20, bottom: 70, left: 80 };
// const width = 800 - margin.left - margin.right;
// const height = 500 - margin.top - margin.bottom;

// const svg = d3.select("#chart-area")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// const x = d3.scaleLinear().range([0, width]);
// const y = d3.scaleLinear().range([height, 0]);

// // Fisheye scale setup
// const fisheye = d3.fisheye.circular().radius(100).distortion(2);

// const color = d3.scaleOrdinal()
//   .domain(["Male", "Female"])
//   .range(["#35388e", "#dd3131"]);

// const tooltip = d3.select("body")
//   .append("div")
//   .style("position", "absolute")
//   .style("background", "white")
//   .style("border", "1px solid #ccc")
//   .style("padding", "8px")
//   .style("border-radius", "5px")
//   .style("pointer-events", "none")
//   .style("opacity", 0)
//   .style("font-size", "0.9em");

// d3.csv("sleep_hours_quality_gender.csv").then(data => {
//   data.forEach(d => {
//     d.SleepHours = +d.SleepHours;
//     d.SleepQuality = +d.SleepQuality;
//   });

//   x.domain(d3.extent(data, d => d.SleepHours)).nice();
//   y.domain(d3.extent(data, d => d.SleepQuality)).nice();

//   svg.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(d3.axisBottom(x));

//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // 轴标签
//   svg.append("text")
//     .attr("text-anchor", "middle")
//     .attr("x", width / 2)
//     .attr("y", height + 50)
//     .text("Total Sleep Hours")
//     .style("font-size", "14px");

//   svg.append("text")
//     .attr("text-anchor", "middle")
//     .attr("transform", "rotate(-90)")
//     .attr("x", -height / 2)
//     .attr("y", -55)
//     .text("Sleep Quality")
//     .style("font-size", "14px");

//   const dots = svg.selectAll("circle")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("r", 4)
//     .attr("fill", d => color(d.Gender))
//     .attr("opacity", 0.8)
//     .attr("cx", d => x(d.SleepHours))
//     .attr("cy", d => y(d.SleepQuality))
//     .on("mouseover", (event, d) => {
//       tooltip.transition().duration(150).style("opacity", 1);
//       tooltip.html(`
//         <strong>Gender:</strong> ${d.Gender}<br/>
//         <strong>Sleep Hours:</strong> ${d.SleepHours}<br/>
//         <strong>Sleep Quality:</strong> ${d.SleepQuality}
//       `)
//         .style("left", (event.pageX + 10) + "px")
//         .style("top", (event.pageY - 28) + "px");
//     })
//     .on("mouseout", () => {
//       tooltip.transition().duration(150).style("opacity", 0);
//     });

//   // Fisheye effect
//   svg.on("mousemove", function (event) {
//     fisheye.focus(d3.pointer(event, this));

//     dots
//       .attr("cx", d => fisheye({ x: x(d.SleepHours), y: y(d.SleepQuality) }).x)
//       .attr("cy", d => fisheye({ x: x(d.SleepHours), y: y(d.SleepQuality) }).y);
//   });
// });


