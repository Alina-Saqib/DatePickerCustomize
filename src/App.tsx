import { useState } from "react";
import "./App.css";
import CustomDatePicker from "./components/CustomDatePicker";


function App() {
  const [selectedDate, setSelectedDate] = useState(""); // Corrected date
  const [isDisabled] = useState(false);

  const handleDateChange = (value: string) => {
  
    console.log("Selected Date:", value);
    setSelectedDate(value);
  };

  return (
   
    <CustomDatePicker 
    value= {selectedDate}
    onChange={handleDateChange}
    disabled={isDisabled}/>
  );
}

export default App;
