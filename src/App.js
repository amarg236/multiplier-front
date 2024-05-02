
import { useState } from 'react';
import './App.css';

function App() {
  const [submitNumber, setSubmitNumber] = useState(0);
  const [multiplyBy2, setMultiplyBy2] = useState(0);
  const [multiplyBy2Square, setMultiplyBy2Square] = useState(0);

  const handleChange = (event) => {
    setSubmitNumber(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.elements.task.value);
    console.log("submit number :" + submitNumber);

    const fetchData = async () => {
      try {
        console.log("submit number :" + submitNumber);
        const response = await fetch('http://localhost:8080/api/v1/multiply?num=' + submitNumber, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });


        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.baseResponse != null && data.baseResponse.statusCode === 200) {
          console.log("data found");
          console.log(data);
          setMultiplyBy2(data.multiplyBy2);
          setMultiplyBy2Square(data.multiplyBy2Square);
        } else {
          console.log("data not found");
        }


      } catch (e) {
        console.error('Error:', e);
      }

    };

    fetchData();

  }

  const handleReset = () => {
    setSubmitNumber(0);
    document.getElementById('task').value = '';
  }

  return (
    <>
      <div className='container'>
        <div className='row text-center'>
          <div className='col-sm-12'>

            <form className='mt-5 p-2' onSubmit={handleSubmit}>
              <div className='input-group input-group-lg mb-2'>
                <input onChange={handleChange} type="text" name="task" id="task" placeholder="Enter Number" autoComplete="off" className=" text-center form-control border-bottom" />

              </div>
              <button className="btn btn-outline-primary p-2" type="submit">Submit</button>
              <button className="btn btn-outline-primary m-1 p-2 " onClick={handleReset} >Reset</button>

            </form>

          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-sm-8 bg-warning bg-body-tertiary text-left '>
            <div className='container w-50  p-5'>
              <p ><span className='fs-5 fw-bold'>MultiplyBy2 :</span> <span className='text-success fs-4'>{multiplyBy2}</span></p>
              <p ><span className='fs-5 fw-bold'>MultiplyBy2Square :</span><span className='text-success fs-4'>{multiplyBy2Square}</span> </p>
            </div>
          </div>
          <div className='col-sm-4 bg-info-subtle text-center rounded-  '>
            <p className='fs-5 fw-bold mt-2'>Input Number</p>
            <p > <span className='text-success fs-4 p-4 mt-3'>{submitNumber}</span></p>
          </div>
        </div>


      </div>
    </>
  );
}

export default App;
