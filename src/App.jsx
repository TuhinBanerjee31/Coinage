import { useState } from "react";
import bgImage from "./assets/bg_image.jpg";
import useCurrencyInfo from "./customHook/useCurrencyInfo";
import InputField from "./components/InputField.jsx";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("inr");
  const [to, setTo] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState("");

  //EXTRACTING DATA FROM CUSTOM HOOK
  const currencyData = useCurrencyInfo(from);
  const options = Object.keys(currencyData);

  // console.log(currencyData);
  // console.log(options);

  //CURRENCY SWAP LOGIC
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount("");
    setAmount("");
  };

  //CURRENCY CONVERSION LOGIC
  const convert = () => {
    setConvertedAmount((amount * currencyData[to]).toFixed(2));
  };

  return (
    <>
      {/* HEADER AREA */}
      <div className="absolute p-8 flex items-end gap-0.5">
        <ion-icon name="invert-mode-outline"></ion-icon>
        <h1 className="text-white text-3xl tracking-widest madimi-one-regular">
          Coinage
        </h1>
      </div>

      {/* CONVERSION AREA */}
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full px-3">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              {/* INPUT FROM-CURRENCY FEILD */}
              <div className="w-full mb-1">
                <InputField
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(newCurrency) => setFrom(newCurrency)}
                  onAmountChange={(newAmount) => setAmount(newAmount)}
                  selectedCurrency={from}
                  className="anta-regular"
                />
              </div>

              {/* SWAP BUTTON */}
              <div className="relative w-full h-0.5">
                <button
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-yellow-600 text-white px-2 py-0.5 anta-regular"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>

              {/* INPUT TO-CURRENCY FEILD */}
              <div className="w-full mb-1">
                <InputField
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(newCurrency) => setTo(newCurrency)}
                  selectedCurrency={to}
                  amountDisable={true}
                  className="anta-regular"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white px-4 py-3 rounded-lg anta-regular"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
