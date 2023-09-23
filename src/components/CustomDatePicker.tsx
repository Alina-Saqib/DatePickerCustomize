import {   Input, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Calendar } from 'antd';
import dayjs from 'dayjs';


interface CustomDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({value,onChange,disabled}) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [inputValue, setInputValue] = useState(value);

   

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
      };

      const formatSelectedDate = (date: Date) => {
     console.log(date);
        if (!date || isNaN(date.getTime())) return "";
       const year = date.getFullYear().toString().padStart(4, '0');
       const month = (date.getMonth() + 1).toString().padStart(2, '0');
       const day = date.getDate().toString().padStart(2, '0');
       const hours = date.getHours().toString().padStart(2, '0');
       const minutes = date.getMinutes().toString().padStart(2, '0');
       const seconds = date.getSeconds().toString().padStart(2, '0');
   
     const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
     setInputValue(formattedDate);
   
       return  formattedDate;
       
      };

      const handleDateSelect = (date: dayjs.Dayjs) => {
        const jsDate = date.toDate(); 
        jsDate.setHours(0,0,0,0)
        const formattedDate = formatSelectedDate(jsDate);
        onChange(formattedDate);
        setInputValue(formattedDate);
        setShowCalendar(false);
      };

      


      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setInputValue(inputValue);
      };

      const handleInputblur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
          const date = new Date(inputValue);
          const formattedDate = formatSelectedDate(date);
          setInputValue(formattedDate);
          onChange(formattedDate);
        
      };

 const handleIncrementHour = () => {
    if (value) {
      const dateValue = new Date(value);
      dateValue.setHours(dateValue.getHours() + 1);
     setInputValue(formatSelectedDate(dateValue))
     onChange(inputValue);
    }
  };

 
  const handleDecrementHour = () => {
    if (value) {
      const dateValue = new Date(value);
      dateValue.setHours(dateValue.getHours() - 1);
      setInputValue(formatSelectedDate(dateValue))
      onChange(inputValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      handleIncrementHour();
    } else if (e.key === "ArrowDown") {
      handleDecrementHour();
    }
  };
  


  return (
    <div>
    <Space direction="vertical">
      <Input
        value={inputValue}
        placeholder="YYYY-MM-DDTHH:mm:SS"
        suffix={<CalendarOutlined onClick={toggleCalendar} />}
        onChange={(e) => handleInputChange(e)}
        onBlur={ (e) => handleInputblur(e)}
        onKeyUp={handleKeyPress}
        size='large'
        style={{ width: '300px' }} 
        disabled={disabled}
      />
      {showCalendar && (
         <Calendar
         onSelect={handleDateSelect}
         style={{ width: '300px' }} 
         fullscreen={false} 
         
      />
        )}
    </Space>
  </div>
  )
}

export default CustomDatePicker
