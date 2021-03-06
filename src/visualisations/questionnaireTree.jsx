import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

import { shorten } from "../utils"

const QuestionnaireTree = ({data, selectNode, active}) => {
    let [transform, setTransform] = useState("")

    let container = useRef(null)
    const clickedNode = (e, data) => {
        active = data.data._id
        selectNode(data.data)
    }

    useEffect(() => {
        const width = container?.current.clientWidth

        const root = d3.hierarchy(data, d => d.next)
        root.dx = 10
        root.dy = 200

        const tree = d3.tree()
            .nodeSize([root.dx, root.dy])
            .separation((a, b) => a.parent == b.parent ? 18 : 22)
        (root)

        let x0 = Infinity
        let x1 = -Infinity
        let y0 = Infinity
        let y1 = -Infinity

        tree.each(d => {
            if (d.x > x1) x1 = d.x
            if (d.x < x0) x0 = d.x
            if (d.y > y1) y1 = d.y
            if (d.y < y0) y0 = d.y
        })

        const margin = {
            top: 10,
            right: 10,
            left: 10,
            bottom: 20
        }

        const svg = d3.select(container?.current)
            .call(d3.zoom().on("zoom", function({transform: t}) {
                zoomContainer.attr("transform", t)
                setTransform(t)
            }))
        
        const zoomContainer = svg.append("g")
            .attr("transform", transform)

        const g = zoomContainer
            .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .attr("font-family", "sans-serif")
                .attr("font-size", 16)
            .append("g")
                .attr("transform", `translate(${tree.dy - y0}, ${tree.dx - x0})`)

        const link = g.append("g")
            .attr("fill", "none")
            .attr("stroke", "#888")
            .attr("stroke-width", 4)
        .selectAll("path")
            .data(tree.links())
            .join("path")
            .attr("d", d3.linkVertical()
                .x(d => d.x)
                .y(d => d.y)
            )
            
        const node = g.append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 5)
        .selectAll("g")
            .data(tree.descendants())
            .join("g")
            .attr("transform", d => `translate(${d.x}, ${d.y})`)

        node.append("g")
            .append("circle")
            .attr("stroke-width", 3)
            .attr("stroke", d => 
                d.data.type === "number" ? "green" : 
                d.data.type === "string" ? "blue" :
                d.data.type === "bool"  ? "yellow" :
                d.data.type === "radio" ? "violet" : "gray")
            .attr("fill", d => d.data._id === active ? "orange" : "white")
            .attr("r", 10)
            .on("click", clickedNode)
        
        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", 18)
            .attr("text-anchor",  "start")
            .text(d => shorten(d.data.name, 18))
            .on("click", clickedNode)
        .clone(true).lower()
            .attr("stroke", "#e5e7eb")
            .attr("font-size", 16)
        


        return () => {
            if(container?.current && container.current.children) {
                for(let child of container.current.children) {
                    child.remove()
                }
            }
        }
    }, [data, active])

    return (
        <svg className="w-full h-full" ref={container}></svg>
    )
}

export default QuestionnaireTree