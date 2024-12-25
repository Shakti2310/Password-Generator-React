import { useState, useCallback, useRef } from "react";

export default function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [isNumbers, setIsNumbers] = useState(false);
  const [isSymbols, setIsSymbols] = useState(false);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isLowercase, setIsLowercase] = useState(false);
  let str = "";

  const generatePassword = useCallback(() => {
    if (isNumbers) str += "0123456789";
    if (isSymbols) str += "!@#$%^&*()_+";
    if (isUppercase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isLowercase) str += "abcdefghijklmnopqrstuvwxyz";

    if (str === "") {
      alert("Switch on any option");
    } else {
      let pass = "";
      for (let i = 1; i <= length; i++) {
        const charCode = Math.floor(Math.random() * str.length);
        pass += str[charCode];
      }
      setPassword(pass);
    }
  }, [isNumbers, isSymbols, isUppercase, isLowercase, length]);

  const passwordRef = useRef(null);

  return (
    <>
      <main className="h-screen bg-gradient-to-tr from-lite-purple to-dark-purple text-white font-poppins flex justify-center items-center">
        <section className="w-[36rem] h-[31rem] p-5 bg-board-blue rounded-3xl flex flex-col gap-3">
          <div>
            <Header name="Result" />
            <div className="w-full bg-board-input h-14 rounded-xl">
              <input
                type="text"
                className="w-5/6 bg-transparent outline-none h-full text-center text-lg"
                placeholder="Click on Generate button"
                value={password}
                readOnly
                ref={passwordRef}
              />
              <button
                type="button"
                className="bg-purple-600 h-full rounded-e-xl w-1/6 cursor-grab"
                onClick={() => {
                  passwordRef.current.select();
                  window.navigator.clipboard.writeText(password);
                }}
              >
                copy
              </button>
            </div>
          </div>
          <div>
            <Header name="Length:" />
            <span className="text-gray-500 font-semibold text-sm pl-1">{length}</span>
            <div className="w-full h-12 bg-board-input rounded-xl flex justify-center items-center gap-4">
              <span className="text-gray-500 font-semibold text-sm">3</span>
              <input
                type="range"
                min={3}
                max={25}
                defaultValue={6}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                className="w-5/6"
              />
              <span className="text-gray-500 font-semibold text-sm">25</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Header name="Settings" />
            <Settings value="Include Numbers" setMethod={setIsNumbers} />
            <Settings value="Include Symbols" setMethod={setIsSymbols} />
            <Settings value="Include Uppercase" setMethod={setIsUppercase} />
            <Settings value="Include Lowercase" setMethod={setIsLowercase} />
          </div>
          <button
            type="button"
            className="w-full rounded-xl bg-purple-600 h-14 text-lg font-semibold cursor-grab"
            onClick={generatePassword}
          >
            Generate Password
          </button>
        </section>
      </main>
    </>
  );
}

function Header({ name }) {
  return (
    <>
      <h1 className="text-gray-500 font-semibold text-sm pl-2 inline-block">{name}</h1>
    </>
  );
}

function Settings({ value, setMethod }) {
  return (
    <>
      <div className="w-full h-10 bg-board-input rounded-xl flex justify-between items-center pr-5 pl-5">
        <span className="text-sm">{value}</span>
        <img
          src="src/assets/off-button.png"
          alt="on"
          className="w-9 cursor-pointer"
          onClick={(e) => {
            if (e.target.src.includes("off")) {
              e.target.src = "src/assets/on-button.png";
              setMethod(true);
            } else {
              e.target.src = "src/assets/off-button.png";
              setMethod(false);
            }
          }}
        />
      </div>
    </>
  );
}
