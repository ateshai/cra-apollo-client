import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { EXCHANGE_RATES } from "../../gql";
// import "./exchange-rates.scss";

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const currenciesElem = data.rates.map(({ currency, rate }) => (
    <li className="exchange-rates__item" key={currency}>
      {currency}: {rate}
    </li>
  ));

  return <ul className="exchange-rates">{currenciesElem}</ul>;
}

export default ExchangeRates;
