import * as React from "react";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import parse from 'date-fns/parse';
import { Field, makeStyles } from "@fluentui/react-components";


const useStyles = makeStyles({
  control: {
    maxWidth: "300px",
  },

});

interface CustomDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const styles = useStyles();

  // const handleDateChange = (date: Date | null | undefined) => {
  //   if (date) {
  //     const modifiedDate = new Date(date);
  //     const isoDate = modifiedDate.toISOString();

  //     onChange(isoDate);
  //   } else {
  //     onChange("");
  //   }
  // };

  const dateValue = value ? new Date(value) : undefined;

  const formatDate = (date?: Date): string => {
    if (!date || isNaN(date.getTime())) return "";
     // Get the components of the date
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Format the date and time
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    return  formattedDate;
  };

  // Function to handle incrementing the hour
  const handleIncrementHour = () => {
    if (value) {
      const dateValue = new Date(value);
      dateValue.setHours(dateValue.getHours() + 1);
      onChange(dateValue.toISOString());
    }
  };

  // Function to handle decrementing the hour
  const handleDecrementHour = () => {
    if (value) {
      const dateValue = new Date(value);
      dateValue.setHours(dateValue.getHours() - 1);
      onChange(dateValue.toISOString());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      // Increment hour when the up arrow key is pressed
      handleIncrementHour();
    } else if (e.key === "ArrowDown") {
      // Decrement hour when the down arrow key is pressed
      handleDecrementHour();
    }
  };

  const supportedFormats = [
    'yyyy-MM-dd',
    'dd-MM-yyyy',
    'yy-MM-dd',
    'MM/dd/yyyy',
    'dd/MM/yyyy',
    'MMM dd, yyyy',
    'dd MMM yyyy',
    'yyyy-MM-dd HH:mm:ss',
    'yyyy-MM-dd`T`HH:mm:SS'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    console.log("Input Date:", inputDate); 
  
    if (inputDate) {
      let parsedDate;
      for (const format of supportedFormats) {
        parsedDate = parse(inputDate, format, new Date());
        if (!isNaN(parsedDate.getTime())) {
          const formattedDate = formatDate(parsedDate);
          console.log(`Formatted Date (${format}):`, formattedDate); 
          onChange(formattedDate);
          return; 
        }
      }
  
      console.log("Invalid Date Format");
      onChange("");
    } else {
      onChange("");
    }
  };



  return (
    
      <Field label="Select a date">
        <DatePicker
          allowTextInput
          value={dateValue}
          size="medium"
          className={styles.control}
          // onSelectDate={handleDateChange}
          placeholder="YYYY-MM-DDTHH:mm:SS"
          formatDate={formatDate}
          disabled={disabled}
          onKeyUp={handleKeyPress}
          onBlur={handleInputChange}
        />
      </Field>
      
   
  );
};
