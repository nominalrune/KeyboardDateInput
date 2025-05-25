import { DateInput, MonthInput, handleDateChange, handleKeyPress } from '../src';
import CustomInput from "./CustomInput";
import "./App.css";

function App() {
  return (
    <div className="app">
      <label>
        Month:
        <MonthInput />
      </label>
      <label>
        Date:
        <DateInput />
      </label>
      <label>
        CustomInput Example:
        <CustomInput onChange={handleDateChange} onKeyDown={handleKeyPress} />
      </label>
    </div>
  );
}

export default App;
