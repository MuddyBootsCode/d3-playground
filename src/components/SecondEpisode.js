import React, {useState, useEffect, useRef } from 'react';
import { select, line, curveCardinal } from 'd3';

const SecondEpisode = () => {
    const initialData = [25, 30, 45, 60 , 20, 65, 75, 90, 102];
    const [data, setData] =useState(initialData);
    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);

        const myLine = line()
            .x((value, index) => index * 50)
            .y(value => 150 - value)
            .curve(curveCardinal);

        svg.selectAll("path")
            .data([data])
            .join("path")
            .attr("d", value => myLine(value))
            .attr("fill", "none")
            .attr("stroke", "blue")
    }, [data]);


    return(
        <div className="episode">
            <h4>Ep.2 Curved Line Chart</h4>
            <svg ref={svgRef}>
                <path d="M0,150, 100,100 150,120" stroke="blue" fill="none"></path>
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


export default SecondEpisode;

