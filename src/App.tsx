import "./App.css";
import CurrencyExchange from "./components/CurrencyExchange";

const App = () => {
  return (
    <>
      <div className="title px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Currency Exchange Rates
        </h1>
      </div>
      <CurrencyExchange />
    </>
  );
};

export default App;
