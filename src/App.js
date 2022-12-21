import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [data, setData] = useState({})
  const [ratePost, setRatePost] = useState([])

  const url = `https://api.currencyfreaks.com/latest?apikey=5695d778bd9945928189edabda338cac&symbols=CAD,IDR,JPY,CHF,EUR,GBP`;
  useEffect(() => {
    let fetchPost = async () => {
      const response = await fetch(url);
      const postData = await response.json();
      setData(postData)
      setRatePost(postData?.rates)
    }
    fetchPost();
  }, [url])

  const fixed = (value) => parseFloat(value.replace(/,/g, '')).toFixed(2)
  const Sell = (value, rate) => {
    const res = Number((value) - (rate / 100) * value);
    return res.toFixed(4)
  }

  const Buy = (value) => {
    const res = Number(value)
    return (res + res * 0.05).toFixed(4)
  }

  return (
    <div className="m-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-black-900">Display Currency Rates</h1>
            <p className="mt-2 text-sm text-black-700">
              Base Currency: {data?.base}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <p className="text-sm font-medium text-black-700">{data?.date}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-black-300">
                  <thead className="bg-black-50">
                    <tr className="bg-orange-200">
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-black-900 sm:pl-6">
                        Currency
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-black-900">
                        We Buy
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-black-900">
                        Exchange Rate
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-black-900">
                        We Sell
                      </th>
                      {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {Object.keys(ratePost).map((item, itemIdx) => (
                      <tr key={item.email} className={itemIdx % 2 === 0 ? 'bg-yellow-200' : 'bg-yellow-100'}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-black-900 sm:pl-6">
                          {item}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black-500">{fixed(Buy(ratePost[item]))}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black-500">{fixed(ratePost[item])}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black-500">{fixed(Sell(ratePost[item], 5))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
