import React, {useState} from 'react';
import BarChart from "./BarChart";

const SixthEpisode = () => {
    const initialData = [25, 30, 45, 60, 10, 65, 75];
    const [data, setData] = useState(initialData);

    return(
        <div className="episode">
            <h4>
                Ep.6 Media Responsive Chart
            </h4>
            <BarChart data={data} />
            <div className="buttonRow">
                <button
                    onClick={() => setData(data.map(value => value + 5))}
                >
                    Update Data
                </button>
                <button
                    onClick={() => setData(data.filter(value => value < 35 ))}
                >
                    Filter Data
                </button>
                <button
                    onClick={() => setData([...data, Math.round(Math.random() * 100)])}
                >
                    Add data
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

export default SixthEpisode;