import React from 'react';


const Circle = ({cx, cy, r, fill}) => {
    return (
        <svg>
            <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={fill}
            />
        </svg>
    )

};

export default Circle;