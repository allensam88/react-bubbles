import React, { useState, useEffect } from "react";
import AxiosWithAuth from '../utils/AxiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
    const [colorList, setColorList] = useState([]);

    useEffect(() => {
        AxiosWithAuth()
            .get('/colors')
            .then(res => {
                console.log('Initial Fetch' , res.data);
                setColorList(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <ColorList colors={colorList} updateColors={setColorList} />
            <Bubbles colors={colorList} />
        </>
    );
};

export default BubblePage;
