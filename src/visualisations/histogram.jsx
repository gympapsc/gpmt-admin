import React, {useRef, useEffect} from "react"
import * as d3 from "d3"

const Histogram = ({data, xlabel, ylabel}) => {
    let element = useRef(null)

    useEffect(() => {
        data = data || []

        let margin = {top: 10, right: 20, bottom: 20, left: 20},
            width = element.current.clientWidth - margin.left - margin.right,
            height = element.current.clientHeight - margin.top - margin.bottom;

        let Svg = d3.select(element.current)
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")")

        let x = d3.scaleLinear()
            .domain([d3.min(data), d3.max(data)])
            .range([0, width])

        let now = new Date()

        let histogram = d3.histogram()
            .value(d => d)
            .domain(x.domain())
            .thresholds(x.ticks(d3.max(data)))
            
        let bins = histogram(data)
            
        console.log(data)

        Svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(-height*1.3).ticks(7))
            .call(g =>
                g.selectAll(".tick")
                .selectAll("text")
                    .attr("y", 6)
            )
            .select(".domain").remove()

        let y = d3.scaleLinear()
            .domain([0, 1])
            .range([ height, 0])
            .nice()

        Svg.append("g")
            .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(7))
            .select(".domain").remove()

        Svg.selectAll(".tick line")
            .attr("stroke", "#EBEBEB")

        Svg.selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
              .attr("x", 1)
              .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length / data.length) + ")"; })
              .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1 ; })
              .attr("height", function(d) { return height - y(d.length / data.length); })
              .style("fill", "green")
        
        return () => {
            if(element.current) {
                for(let child of element.current.children) {
                    child.remove()
                }
            }
        }
    })

    return (
        <div className="w-full h-full" ref={element}></div>
    )
}

export default Histogram