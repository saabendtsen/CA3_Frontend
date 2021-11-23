import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import facade from "../apiFacade";
import { Server_URL } from "./Urls";

const BuyCoins = () => {
  const emptyCoin = { name: "", amount: "", buyPrice: "" };

  const [selectedCoin, setSelectedCoin] = useState();
  const [orderList, setOrderList] = useState([]);
  const [dataIsloaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    setDataIsLoaded(false);
    const options = facade.makeOptions("GET", true);
    fetch(Server_URL + "/api/coin/orders", options)
      .then((res) => facade.handleHttpErrors(res))
      .then((data) => {
        setOrderList(data);
        setDataIsLoaded(true);
      });
  }, [setSelectedCoin]);

  const handleChange = (evt) => {
    setSelectedCoin({ ...selectedCoin, [evt.target.id]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("I got clicked");
    const options = facade.makeOptions("POST", true, selectedCoin);
    fetch(Server_URL + "/api/coin/createOrder", options).then((res) =>
      facade.handleHttpErrors(res).then((data) => console.log(data))
    );
  };

  const total = (amount, buyprice) => {
    return parseInt(amount) * parseInt(buyprice);
  };

  const List = () => {
    return (<>
      <table className="table">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Amount</th>
            <th>Buyprice</th>
            <th>Current price</th>
            <th>Total</th>


          </tr>
        </thead>
        <tbody>
          {orderList.map((el, idx) => (
            <tr key={idx}>
              <td>{el.coinName}</td>
              <td>{el.amount}</td>
              <td>{total(el.amount, el.buyPrice)}</td>
              <td>{el.currentPrice}</td>
              <td>{total(el.amount, el.currentPrice)}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </>);
  };

  return (
    <>
      <div
        className="form-group"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <label htmlFor="coinName">CoinName</label>
        <input
          type="text"
          id="coinName"
          name="CoinName"
          placeholder="ETH"
        ></input>
        <label htmlFor="Amount">Amount</label>
        <input type="number" id="amount" name="amount" placeholder="10"></input>
        <label htmlFor="buyPrice">BuyPrice</label>
        <input
          type="number"
          id="buyPrice"
          name="buyPrice"
          placeholder="3000"
        ></input>
        <div>{JSON.stringify(selectedCoin)}</div>
        <button
          type="submit"
          className="btn btn-success"
          onClick={handleSubmit}
          id="buy"
        >Buy
        </button>
      </div>

      <div>
        {dataIsloaded && <List />}       
      </div>
    </>
  );
};

export default BuyCoins;
