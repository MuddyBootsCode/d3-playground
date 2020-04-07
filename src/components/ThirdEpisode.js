import React, {useState, useEffect, useRef } from 'react';
import {select, line, curveCardinal, axisBottom, axisRight, scaleLinear} from 'd3';

const ThirdEpisode = () => {
    const initialData = [25, 30, 45, 60 , 20, 65, 75, 100];
    const [data, setData] =useState(initialData);
    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);

        const xScale = scaleLinear()
            .domain([0, data.length - 1])
            .range([0, 300]);

        const yScale = scaleLinear()
            .domain([0,150])
            .range([150,0]);

        const xAxis = axisBottom(xScale)
            .ticks(data.length)
            .tickFormat(index => index + 1);
        svg.select(".x-axis")
            .style("transform", "translateY(150px)")
            .call(xAxis);

        const yAxis = axisRight(yScale);
        svg.select(".y-axis")
            .style("transform", "translateX(300px)")
            .call(yAxis);

        const myLine = line()
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal);

        svg.selectAll(".line")
            .data([data])
            .join("path")
            .attr("class", "line")
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke", "blue")
    }, [data]);


    return(
        <div className="episode">
            <h4>Ep.3 Chart with X & Y Axis</h4>
            <svg ref={svgRef} style={{ overflow: "visible"}}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <br/>
            <div className="buttonRow">
                <button
                    onClick={() => setData(data.map(value => value + 5))}
                >
                    Update Data
                </button>
                <button
                    onClick={() => setData(data.filter(value => value < 35))}
                >
                    Filter Data
                </button>
                <button
                    onClick={() => setData(initialData)}
                >
                    Reset Data
                </button>
            </div>

        </div>

    )


};


export default ThirdEpisode;

