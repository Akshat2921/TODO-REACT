import { useState,useEffect, use } from "react";
const Weather = () => {
    const[city,setcity]=useState("Delhi");
    // const[weather,setweather]=useState(null);
    // const[loading,setloading]=useState(false);
    // const[error,seterror]=useState(null);

    const[state,setstate]=useState({
        data:null,
        loading:false,
        error:null,
    });
    useEffect(() => {
        const controller=new AbortController();
        // setloading(true);
        // seterror(null);
        // setweather(null);

        setstate({data:null,loading:true,error:null});

        fetch(`https://wttr.in/${city}?format=j1`, {
      signal: controller.signal
    }).then(res => {
        if(!res.ok) throw new Error("City nahi mili");
        return res.json();
    })
    .then(data => {
        // setweather(data);
        // setloading(false);

        setstate({data,loading:false,error:null});
    })
    .catch(err => {
        if(err.name === "AbortError") return;
        // seterror(err.message);
        // setloading(false);

        setstate({data:null,loading:false,error:err.message});
    });

    return () => controller.abort();
    },[city]);

    const{data,loading,error}=state;
  return (
    <div>
        <input value={city} onChange={e => setcity(e.target.value)} />
      {loading && <p>Loading...</p>}
      {error   && <p>Error: {error}</p>}
      {data && (
        <div>
          <p>Temperature: {data.current_condition[0].temp_C}°C</p>
          <p>Feel: {data.current_condition[0].FeelsLikeC}°C</p>
          <p>Description: {data.current_condition[0].weatherDesc[0].value}</p>
        </div>
      )}
    </div>
  )
}

export default Weather