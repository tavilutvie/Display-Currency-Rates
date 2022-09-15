import logo from './logo.svg';
import {useState, useEffect } from "react";
import './App.css';

function App() {
  const [data, setData] = useState({})
  const [ratePost, setRatePost] = useState([])
  // const [row, setRow] = undefined
  // const app_key = process.env.REACT_APP_API_KEY;
  // axios.get(`https://api.currencyfreaks.com/latest?apikey=5695d778bd9945928189edabda338cac`).then((res) => res.json).catch((err) => console.log(err))

  const url = `https://api.currencyfreaks.com/latest?apikey=5695d778bd9945928189edabda338cac&symbols=CAD, IDR, JPY, CHF, EUR, GBP`;
  useEffect(() => {
    let fetchPost = async () => {
      const response = await fetch(url);
      const postData = await response.json();
      setData(postData)
      setRatePost(postData?.rates)
    }
  //  let row = axios.get(`https://api.currencyfreaks.com/latest?apikey=5695d778bd9945928189edabda338cac`).then((res) => res.json)
    fetchPost();
  }, [])

  // console.log(data);
  console.log(ratePost)
  return (
    <div style={{padding: '20px'}}>
      <h1>Tavi</h1>
      <h2>{data?.date}</h2>
      <h3>{data?.base}</h3>
      {Object.keys(ratePost).map((item) => {
        return <tr key={item}>
          <td>{item}</td>
          <td>{ratePost[item]}</td>
        </tr>
      })}
  
      {/* {
        ratePost && ratePost?.map((post, index) => (
          <div key={index}>
            <li>{post?.rates}</li>
          </div>
        ))
      } */}
    </div>
  )
}

export default App;
