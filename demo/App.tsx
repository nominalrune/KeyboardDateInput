import { DateInput, MonthInput, WithMonthInputFeature } from '../src';
import CustomInput from "./CustomInput";
import "./App.css";

function App() {
  const Input = WithMonthInputFeature(CustomInput);
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
        <Input />
      </label>
    </div>
  );
}

export default App;
