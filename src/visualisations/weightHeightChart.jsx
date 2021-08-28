import React, {useRef, useEffect} from "react"
import * as d3 from "d3"

import {
    useBMIStats
} from "../hooks"

const WeightHeightChart = ({users, xlabel, ylabel}) => {
    let element = useRef(null)


    useEffect(() => {
        users = users || []

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


        let heights = users.map(s => s.height)
        let weights = users.map(s => s.weight)

        let x = d3.scaleLinear()
            .domain([Math.min(d3.min(weights) - 10, 0), d3.max(weights) + 10])
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


        let y = d3.scaleLinear()
            .domain([0, d3.max(heights) + 5])
            .range([ height, 0])
            .nice()

        Svg.append("g")
            .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(3))
            .select(".domain").remove()

        Svg.selectAll(".tick line")
            .attr("stroke", "#EBEBEB")

        Svg.selectAll("rect")
            .data(users)
            .enter()
            .append("circle")
              .attr("r", 2)
              .attr("cx", d => x(d.weight))
              .attr("cy", d => y(d.height))
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

export default WeightHeightChart