import { useEffect,useState } from "react"
const Learn = () => {
    // const [usersData, setusersData] = useState([]);
    // const [Loading, setLoading] = useState(false)

    // async function getUsersData(){
    // const URL="https://dummyjson.com/users"
    // let response=await fetch(URL);
    // response=await response.json();
    // // console.log(response.users);
    // setusersData(response.users);
    // setLoading(false);
    // }
    // useEffect(() => {
    //     setLoading(true);
    //   getUsersData();
    // },[])
//     const [users, setUsers]     = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState(null);

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((res) => {
//         if (!res.ok) throw new Error("Kuch gadbad hui!");
//         return res.json();
//       })
//       .then((data) => {
//         setUsers(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error)   return <p>Error: {error}</p>;

const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 1. Function banao
    function handleResize() {
      setWidth(window.innerWidth);
    }

    // 2. Listener add karo
    window.addEventListener("resize", handleResize);

    // 3. Cleanup — component hatne par listener remove karo
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // [] = sirf ek baar chalega

    
  return (
    <div>
       <p>Window width: {width}px</p>
    </div>
  )
}

export default Learn