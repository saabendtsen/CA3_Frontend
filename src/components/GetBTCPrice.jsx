import React, { useEffect, useState } from "react";
import { bitCoinPrice_URL } from "./Urls";
const GetBTCPrice = () => {
  const [items, setItems] = useState();
  const [DataisLoaded, setDataisLoaded] = useState(false)
  const [coinList, setCoinList] = useState([])
  const [selectedCoin, setSelectedCoin] = useState({
    "ethereum": {
        "usd": 4730.48,
        "usd_market_cap": 564771882900.821,
        "usd_24h_change": -2.381931884528019
    }
});
  let id;
  let selectedCoinLoad = false;

  useEffect(() => {
    setDataisLoaded(false)
    fetch(bitCoinPrice_URL)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setDataisLoaded(true)
      })
      setCoinList([])
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => res.json())
      .then((json) => {
        json.coins.map(el => {
          const coin = {symbol: el.item.symbol, id:el.item.name};
          coinList.push(coin)
        })
        setCoinList(coinList);
    })}, []);

  const seachCoin = (evt) =>{
      evt.preventDefault();
      fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`)
      .then((res) => res.json())
      .then((json) =>{
        setSelectedCoin(json);
        console.log(selectedCoinLoad);
      })
  }


  if (!DataisLoaded)
    return (
      <div>
        <h1> Fetching Data! Please wait.... </h1>{" "}
      </div>
    );

  return( <div>{JSON.stringify(selectedCoin)}
    <h4> Current price on BTC in USD: {items.bpi.USD.rate}</h4>
    <div>
      <datalist id="suggestions">
        {coinList.map((el,idx) =>{
          return(
        <option key={idx}>{el.id}</option>
        )})}
      </datalist>
      <input onChange={(evt)=> id = evt.target.value} autoComplete="on" list="suggestions" /> <button onClick={seachCoin} type="submit">Seach coin Price</button>
        
        {/* {selectedCoinLoad &&     */}
      <div>
        <ul>
           <li> Selected coin: </li><br />
            <li>Name: {JSON.stringify(Object.keys(selectedCoin)[0])}</li><br />
            <li>Current price: {Object.keys(selectedCoin)[0].usd}</li>
        </ul>
      </div>
       {/* } */}
      
    </div>

  </div>);
  
}

export default GetBTCPrice;
