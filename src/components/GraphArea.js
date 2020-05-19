import React, {useEffect, useRef} from 'react';
import {useRecoilState} from "recoil";
import {itemList} from "../atoms";
import { select } from 'd3';

const GraphArea = () => {
    const svgRef = useRef();
    const [items, setItemList] = useRecoilState(itemList)

    useEffect(() => {
        const svg = select(svgRef.current)
    })




    return (
        <div>
            <svg height='800px' width='100%' style={{ backgroundColor: 'grey'}} ref={svgRef}>

            </svg>
        </div>
    );
};

export default GraphArea;