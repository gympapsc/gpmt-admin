import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

const QuestionnaireTree = ({data, selectNode, active}) => {

    let container = useRef(null)
    const clickedNode = (e, data) => {
        console.log(data)
        active = data.data._id
        selectNode(data.data)
    }

    useEffect(() => {
        // let data = data || {
        //     "name": "disease",
        //     "type": "string",
        //     "condition": {},
        //     "next": [
        //         {
        //             "name": "age",
        //             "type": "number",
        //             "condition": {
        //                 "eq": "ms"
        //             },
        //             "next": [
        //                 {
        //                     "name": "age",
        //                     "type": "radio",
        //                     "condition": {
        //                         "eq": "ms"
        //                     },
        //                     "next": [
        
        //                     ]
        //                 },
        //                 {
        //                     "name": "age",
        //                     "type": "number",
        //                     "condition": {
        //                         "eq": "ms"
        //                     },
        //                     "next": [
        //                         {
        //                             "name": "age",
        //                             "type": "radio",
        //                             "condition": {
        //                                 "eq": "ms"
        //                             },
        //                             "next": [
                
        //                             ]
        //                         },
        //                         {
        //                             "name": "age",
        //                             "type": "number",
        //                             "condition": {
        //                                 "eq": "ms"
        //                             },
        //                             "next": [
                
        //                             ]
        //                         }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             "name": "age",
        //             "type": "number",
        //             "condition": {
        //                 "eq": "ms"
        //             },
        //             "next": [
        //                 {
        //                     "name": "age",
        //                     "type": "number",
        //                     "condition": {
        //                         "eq": "ms"
        //                     },
        //                     "next": [
        
        //                     ]
        //                 },
        //                 {
        //                     "name": "age",
        //                     "type": "number",
        //                     "condition": {
        //                         "eq": "ms"
        //                     },
        //                     "next": [
        
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             "name": "age",
        //             "type": "number",
        //             "condition": {
        //                 "eq": "ms"
        //             },
        //             "next": [
        //                 {
        //                     "name": "age",
        //                     "type": "number",
        //                     "condition": {
        //                         "eq": "ms"
        //                     },
        //                     "next": [
        
        //                     ]
        //                 },
        //                 {
        //                     "name": "age",
        //                     "type": "number",
        //                     "condition": {
        //                         "eq": "ms"
        //                     },
        //                     "next": [
        
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             "name": "age",
        //             "type": "number",
        //             "condition": {
        //                 "eq": "ms"
        //             },
        //             "next": [
        //                 {
        //                     "name": "age",
        //                     "type": "number",
        //                     "condition": {
        //                         "eq": "ms"
        //                     },
        //                     "next": [
        
        //                     ]
        //                 }
        //             ]
        //         }
        //     ]
        // }

        console.log("TREE DATA", data)

        const width = container?.current.clientWidth

        const root = d3.hierarchy(data, d => d.next)
        root.dx = 10
        root.dy = width / (root.height + 1)

        const tree = d3.tree()
            .nodeSize([root.dx, root.dy])
            .separation((a, b) => a.parent == b.parent ? 8 : 12)
        (root)

        let x0 = Infinity
        let x1 = -Infinity

        tree.each(d => {
            if (d.x > x1) x1 = d.x
            if (d.x < x0) x0 = d.x
        })

        const margin = {
            top: 10,
            right: 10,
            left: 25,
            bottom: 20
        }

        const svg = d3.select(container?.current)
            .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
        
        const g = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 16)
            .attr("transform", `translate(${tree.dy / 3}, ${tree.dx - x0})`)

        const link = g.append("g")
            .attr("fill", "none")
            .attr("stroke", "#888")
            .attr("stroke-width", 3)
        .selectAll("path")
            .data(tree.links())
            .join("path")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x))
            
        const node = g.append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 5)
        .selectAll("g")
            .data(tree.descendants())
            .join("g")
            .attr("transform", d => `translate(${d.y}, ${d.x})`)

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
            .attr("x", d => d.children ? -14 : 14)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name)
            .on("click", clickedNode)
            .clone(true).lower()
            .attr("stroke", "#d1d5db")
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