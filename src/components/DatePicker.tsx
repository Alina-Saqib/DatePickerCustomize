
import * as React from "react";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Field,  makeStyles } from "@fluentui/react-components";




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

  const handleDateChange = (date: Date | null | undefined) => {
    if (date) {
      const modifiedDate = new Date(date);
      modifiedDate.setHours(0, 0, 0, 0);
      const isoDate = modifiedDate.toISOString();
      onChange(isoDate);
    } else {
      onChange("");
    }
  };

  const dateValue = value ? new Date(value) : undefined;

  const formatDate = (date?: Date): string => {
    if (!date || isNaN(date.getTime())) return ""; // Check for an invalid date

    const utcDate = new Date(date.toUTCString());
    const isoDate = utcDate.toISOString().slice(0, 19);
    return isoDate;
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

    // Function to handle key press events
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault(); 
        handleIncrementHour();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleDecrementHour();
      }
    };

  return (
    <Field label="Select a date">
    
      <DatePicker
        value={dateValue}
        size="medium"
        className={styles.control}
        onSelectDate={handleDateChange}
        placeholder="YYYY-MM-DDTHH:mm:SS"
        formatDate={formatDate}
        disabled={disabled}
        onKeyDown={handleKeyPress} 
      />
    </Field>
  );
};
