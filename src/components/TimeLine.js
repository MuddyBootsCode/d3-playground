import React,  { useState, useRef, useEffect } from 'react';
import useResizeObserver from "./useResizeObserver";
import { select, min, max, scaleTime, scaleLinear, axisBottom } from "d3";

const getDate = dateString => {
    const date = dateString.split("-");
    return new Date(date[2], date[0] - 1, date[1] );
};


const TimeLine = () => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [data, setData] = useState([]);
    const [highlight, setHighlight] = useState([]);
    const [Bbcharacters, setBbCharacters] = useState([])

    useEffect(() => {
        const svg = select(svgRef.current);
        if (!dimensions) return;

        const minDate = min(data, episode => getDate(episode.air_date));
        const maxDate = max(data, episode => getDate(episode.air_date));

        const xScale = scaleTime()
            .domain([minDate, maxDate])
            .range([0, dimensions.width]);

        const yScale = scaleLinear()
            .domain([max(data, episode => episode.characters.length), 0])
            .range([0, dimensions.height]);

        svg
            .selectAll(".episode")
            .data(data)
            .join("line")
            .attr("class", "episode")
            .attr("stroke", episode =>
                episode.characters.includes(highlight) ? "blue" : "black"
            )
            .attr("x1", episode => xScale(getDate(episode.air_date)))
            .attr("y1", dimensions.height)
            .attr("x2", episode => xScale(getDate(episode.air_date)))
            .attr("y2", episode => yScale(episode.characters.length));

        const xAxis = axisBottom(xScale);
        svg
            .select(".x-axis")
            .style("transform", `translateY(${dimensions.height}px)`)
            .call(xAxis);

        // draw the gauge
    }, [data, dimensions, highlight])

    useEffect(() => {
        fetch("https://www.breakingbadapi.com/api/characters?category=Breaking+Bad")
            .then(response => response.ok && response.json())
            .then(characters => {
                setBbCharacters(
                    characters.sort((a, b) => a.name.localeCompare(b.name))
                );
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        fetch("https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad")
            .then(response => response.ok && response.json())
            .then(episodes => {
                console.warn(episodes);
                setData(episodes);
            })
            .catch(console.error);
    }, []);

    return(
        <div ref={wrapperRef} style={{ marginBottom: "2rem", display: 'flex', flexDirection: 'column',
            justifyItems: 'center', alignItems: 'center' }}>
            <svg
                ref={svgRef}
            >
            <g className='x-axis'/>
            </svg>
            <h2>Select your character</h2>
            <select value={highlight} onChange={e => setHighlight(e.target.value)}>
                <option>Select character</option>
                {Bbcharacters.map(character => (
                    <option key={character.name}>{character.name}</option>
                ))}
            </select>
        </div>
    )

}

export default TimeLine;