import { DateInput, MonthInput, handleMonthChange, handleKeyPress } from '../src';
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
        <CustomInput onChange={handleMonthChange} onKeyDown={handleKeyPress} />
      </label>
    </div>
  );
}

export default App;
