import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3';

const FirstEpisode = () => {
    const initialData = [20, 25, 30, 45, 60];
    const [data, setData] = useState([20, 25, 30, 45, 60]);
    const svgRef =useRef();

    useEffect(() => {
        const svg = select(svgRef.current);
        svg
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("class", "new")
            .attr("stroke", "red")
            .attr("r", value => value)
            .attr("cx", value => value * 2)
            .attr("cy", value => value * 2);
    }, [data]);

    return (
        <div className="episode">
            <h4>Ep.1 Circles</h4>
            <svg
                ref={svgRef}
            >

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

export default FirstEpisode;