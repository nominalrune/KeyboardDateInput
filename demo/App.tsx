import { DateInput, MonthInput, withMonthInputFeature } from '../src';
import CustomInput from "./CustomInput";
import "./App.css";
import Markdown from 'react-markdown';
import markdown from '../README.md?raw';
import { Prism } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
  const Input = withMonthInputFeature(CustomInput);
  return (<>
    <div className="app">
      <div className="block">
        
      <h1>Date Input Examples</h1>
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
      </div>
      <div className="block">
        
    <Markdown
      components={{
        code(props) {
          const { children, className, node, ref, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <Prism
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              style={oneDark}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        }
      }}>{markdown}</Markdown>

      </div>
  </>);
}

export default App;
