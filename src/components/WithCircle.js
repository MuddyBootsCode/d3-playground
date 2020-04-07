import React, {useEffect, useState, useRef} from 'react';
import Circle from "./Circle";
import {select} from "d3";


const circleFilter = (circle) => {
    return circle.cord < 35
};


const WithCircle = () => {
    const initialData = [
        {cord:20, color: "green"},
        {cord:25, color: "red"},
        {cord:30, color: "blue"},
        {cord:45, color: "pink"},
        {cord:60, color: "cyan"}];
    const [data, setData] = useState(initialData);

    const ref = useRef();

    useEffect(() => {
        const svg = select(ref.current);
        svg
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("class", "new")
    }, [data]);

    return(
        <div className="episode">
            <h4>With Component Circle</h4>
            <svg>
                {
                    data.map((c) => {
                        return(
                            <Circle
                                cx={c.cord * 3}
                                cy={c.cord * 2}
                                r={3 + c.cord}
                                fill={c.color}
                            />
                            )
                    })
                }
            </svg>
            <br/>
            <div className="buttonRow">
                <button
                    onClick={() => {
                        setData(data.map((value) => {
                            value.cord += 5;
                            return value;
                        }));
                    }}
                >
                    Update Data
                </button>
                <button
                    onClick={() => {
                        setData(data.filter(circleFilter))
                    }}
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

export default WithCircle;