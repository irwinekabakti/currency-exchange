import { FC, useState, useEffect } from "react";
import { CurrencyRates } from "../types/type";

interface CurrencyResponseProps {
  rates: CurrencyRates;
}

const CurrencyExchange: FC = () => {
  const [currencyRates, setCurrencyRates] = useState<CurrencyRates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const currencies: string[] = ["CAD", "IDR", "JPY", "CHF", "EUR", "USD"];

  const baseUrl = import.meta.env.VITE_CURRENCY_API_BASE_URL;
  const apiKey = import.meta.env.VITE_CURRENCY_API_KEY;

  const getCurrency = async () => {
    if (!baseUrl || !apiKey) {
      setError(
        "API configuration is missing. Please check your environment variables !"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${baseUrl}/v2.0/rates/latest?apikey=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: CurrencyResponseProps = await response.json();
      setCurrencyRates(data.rates);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch currency rates");
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrency();
  }, []);

  const calculateBuyRate = (rate: string): string => {
    return (parseFloat(rate) * 1.1).toFixed(4);
  };

  const calculateSellRate = (rate: string): string => {
    return (parseFloat(rate) * 0.95).toFixed(4);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-2 md:px-4">
      <div className="overflow-x-auto">
        <table className="w-full bg-orange-500 text-white">
          <thead>
            <tr className="border-b border-orange-400">
              <th className="px-4 py-4"></th>
              <th className="px-4 py-4">We Buy</th>
              <th className="px-4 py-4">Exchange Rate</th>
              <th className="px-4 py-4">We Sell</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency, index) => (
              <tr key={index} className="border-b border-orange-400">
                <td className="text-center px-4 py-4">{currency}</td>
                <td className="text-center px-4 py-4">
                  {calculateBuyRate(currencyRates[currency])}
                </td>
                <td className="text-center px-4 py-4">
                  {parseFloat(currencyRates[currency]).toFixed(4)}
                </td>
                <td className="text-center px-4 py-4">
                  {calculateSellRate(currencyRates[currency])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrencyExchange;
