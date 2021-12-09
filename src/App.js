import './App.css';
import Form from "./Form/Form";
import React from "react";
import {formData} from "./Data/formData";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Form formData={formData}/>
      </header>
    </div>
  );
}

export default App;
