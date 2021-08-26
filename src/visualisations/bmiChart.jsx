import React, {useRef, useEffect} from "react"
import * as d3 from "d3"

import {
    useBMIStats
} from "../hooks"

const BMIChart = ({xlabel, ylabel}) => {
    let element = useRef(null)

    let stats = useBMIStats()

    console.log(stats)

    useEffect(() => {
        stats = stats || []

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


        let bmis = stats.map(s => s.bmi)

        let x = d3.scaleLinear()
            .domain([d3.min(bmis) - 10, d3.max(bmis) + 10])
            .range([0, width])

        Svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(-height*1.3).ticks(8))
            .call(g =>
                g.selectAll(".tick")
                .selectAll("text")
                    .attr("y", 6)
            )
            .select(".domain").remove()

        let counts = stats.map(s => s.users)

        let y = d3.scaleLinear()
            .domain([0, d3.max(counts) + 5])
            .range([ height, 0])
            .nice()

        Svg.append("g")
            .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(3))
            .select(".domain").remove()

        Svg.selectAll(".tick line")
            .attr("stroke", "#EBEBEB")

        Svg.selectAll("rect")
            .data(stats)
            .enter()
            .append("rect")
              .attr("x", 1)
              .attr("transform", function(d) { return "translate(" + x(d.bmi - 1/2) + "," + y(d.users) + ")"; })
              .attr("width", function(d) { return x(d.bmi) - x(d.bmi - 1) - 2 })
              .attr("height", function(d) { return height - y(d.users); })
              .style("fill", "blue")
        
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

export default BMIChart