import BasicForm from "./components/BasicForm";
import SimpleInput from "./components/SimpleInput";

function App() {
  return (
    <div>
      <div className="app">
        <h2>Basic Form</h2>
        <BasicForm />
      </div>

      <div className="app">
        <h2>Simple Input</h2>
        <SimpleInput />
      </div>
    </div>
  );
}

export default App;
