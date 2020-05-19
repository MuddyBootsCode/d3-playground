import React, {useState, useRef } from "react";
import useResizeObserver from "./useResizeObserver";

const DragCircle = () => {
    const [position, setPosition] = useState({
        x: 150,
        y: 75,
        active: false,
        offset: { }
    });

    const handlePointerDown = e => {
        const el = e.target;
        const bbox = e.target.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;
        el.setPointerCapture(e.pointerId);
        setPosition({
            ...position,
            active: true,
            offset: {
                x,
                y
            }
        });
    };
    const handlePointerMove = e => {
        const bbox = e.target.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;
        if (position.active) {
            setPosition({
                ...position,
                x: position.x - (position.offset.x - x),
                y: position.y - (position.offset.y - y)
            });
        }
    };
    const handlePointerUp = e => {
        setPosition({
            ...position,
            active: false
        });
    };

    return (
        <div className="episode" >
            <h4>Draggable Circle</h4>
            <svg>
                <circle
                    cx={position.x}
                    cy={position.y}
                    r={50}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerMove={handlePointerMove}
                    fill={position.active ? "blue" : "black"}
                />
            </svg>
            <br/>
            <div className="buttonRow" style={{ display: "flex", justifyItems: "center"}}>
                <button
                    onClick={() => {
                        setPosition({...position, x: 150, y: 75})
                    }}
                >
                    Reset Circle
                </button>

            </div>
        </div>

    );
};

export default DragCircle;


