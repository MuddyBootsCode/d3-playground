import React from 'react';
import { itemWithID } from "../atoms";
import { useRecoilState } from "recoil";

const AtomCircle = ({id}) => {

    const [itemState, setItemState] = useRecoilState(itemWithID(id))

    const { cx, cy, r, fill } = itemState;

    return (
        <circle
            cx={!cx ? 10 : cx}
            cy={!cy ? 10 : cy}
            r={!r ? 10 : r}
            fill={!fill ? 'blue' : fill}
        />
    );
};

export default AtomCircle;