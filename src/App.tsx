// App.js
import { useState } from 'react';
import './App.css';
import {CustomDatePicker} from './components/DatePicker';

function App() {
  const [selectedDate, setSelectedDate] = useState(''); // Corrected date
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDateChange = (value: string) => {
    // Handle the date change here
    console.log('Selected Date:', value);
    setSelectedDate(value);
  };

  return (
    <CustomDatePicker
      value={selectedDate}
      onChange={handleDateChange}
      disabled={isDisabled} // Use the isDisabled state variable
    />
    // <Default/>
  );
}

export default App;
