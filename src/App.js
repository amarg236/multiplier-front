
import { useState } from 'react';
import './App.css';

function App() {
  const [submitNumber, setSubmitNumber] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.elements.task.value);
    setSubmitNumber(submitNumber);
      // console.log(event.target.elements.input.value);
      handleReset();
  }

  const handleReset = () =>{
    setSubmitNumber(0);
  }

  return (
    <div className='addtask'>
  <form onSubmit={handleSubmit}>
            <input type="text" name="task" id="task" placeholder="Enter Number" autoComplete="off" />
            <button type="submit">Submit</button>
        </form>
    </div>
  );
}

export default App;
