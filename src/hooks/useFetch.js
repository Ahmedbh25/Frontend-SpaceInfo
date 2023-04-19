import React, {useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, dispatch, state) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const FetchApiData = async()=>{
        setLoading(true);
        try{
            const res = await axios.get(url);
            setData(res.data);
            if(dispatch){
                state.products = res.data;
                state.constantProducts = res.data;
                const Computers = JSON.stringify(res.data);
                localStorage.setItem('initialComputers', Computers);
                dispatch({ type: "SET_COMPUTERS", payload: res.data });
            }
        }catch(error){
            setError(error);
        }
        setLoading(false);
    };
    FetchApiData();

    }, [url])
    return { data, loading, error };
}

export default useFetch;
