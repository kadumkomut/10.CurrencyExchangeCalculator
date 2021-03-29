import axios from "axios";
import { useEffect, useState } from "react";
import './style.css'
import './Components/animate.css';
import Loading from './Components/Loading';

function App() {
  const [load,setLoad] = useState(false);
  const [data,setData] = useState(false);
  const [input1,setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [option1, setOption1] = useState(0);
  const [option2, setOption2] = useState(0);

  
  useEffect(()=>{
    setTimeout(()=>{
      axios.get('https://api.coingecko.com/api/v3/exchange_rates')
      .then(res=>{
        setData(res.data.rates);
      })
      .then(()=>{
        setLoad(true);
      })
      .catch(err=>{
        console.log(err);
      })
    },2000);  
    
  },[]);

  const calculateCurrency = (e,track) =>{
     track===1?setInput1(e.target.value):setInput2(e.target.value);
     let exchangeRate = 0;
     var num1 = parseFloat(option1);
     var num2 = parseFloat(option2);
     if(num1>num2) {
       exchangeRate = num1/num2;
       if(track===1){
         var cal = e.target.value/exchangeRate;
         setInput2(cal);
       }
       if(track===2){
        var cal = e.target.value*exchangeRate;
        setInput1(cal);
       }
       return;
     } 
      exchangeRate = num2/num1;
      if(track===1){
        var cal = e.target.value*exchangeRate;
        setInput2(cal);
      }
      if(track===2){
      var cal = e.target.value/exchangeRate;
      setInput1(cal);
     }
  }

  
  return (!load?<div style={{width:"100vw",height:"100vh",display:"grid",placeItems:"center"}}><Loading /></div>:
    <div className="App">
      <div style={{width:"100vw",height:"100vh",display:"grid",placeItems:"center"}}>
        <div style={{padding:"20px"}}>
      <header>
        <h1 className="animated bounce">Currency Exchange <br/>Calculator</h1>
      </header>
      <form className="formStyle">
        
        <div>
          <input type="text" value={input1} 
            onChange={(e)=>calculateCurrency(e,1)} 
            placeholder="Enter price"/>
          <select className="currencyList" value={option1} onChange={(e)=>setOption1(e.target.value)}>
              {data&&Object.keys(data).map((key, index) =>
              <option key={index} value={data[key].value}>{data[key].name} ( {data[key].unit} )</option>
            )}
          </select>   
        </div>
        <div>
          <input type="text" 
          value={input2} 
          onChange={(e)=>calculateCurrency(e,2)} placeholder="Enter price"/>   
          <select className="currencyList" value={option2} onChange={(e)=>setOption2(e.target.value)}>
              {data&&Object.keys(data).map((key, index) =>
              <option key={index} value={data[key].value}>{data[key].name} ( {data[key].unit} )</option>
            )}
          </select>       
        </div>
      </form>
      </div>
      </div>
      <div style={{position:"fixed",bottom:"15px",right:"15px"}}>
        MOKO™ @All Rights Reserved.
      </div>
    </div>
  );
}

export default App;
