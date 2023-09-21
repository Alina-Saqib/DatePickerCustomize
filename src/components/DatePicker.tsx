import * as React from 'react';
import { DatePicker, IDatePickerStyles, IconButton } from '@fluentui/react';
import { registerIcons } from '@fluentui/react';
import { ArrowUp12Regular, ArrowDown12Regular } from '@fluentui/react-icons';

registerIcons({
  icons: {
    Up: <ArrowUp12Regular />,
    Down: <ArrowDown12Regular />,
  },
});

interface CustomDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const datePickerContainerStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center', // Align the items vertically
};

const iconButtonStyles: React.CSSProperties = {
  marginRight: '8px',
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const handleDateChange = (date: Date | null | undefined) => {
    if (date) {
      const modifiedDate = new Date(date);
      modifiedDate.setHours(0, 0, 0, 0);
      const isoDate = modifiedDate.toISOString();
      onChange(isoDate);
    } else {
      onChange('');
    }
  };

  const formatDate = (date?: Date): string => {
    if (!date || isNaN(date.getTime())) return ''; // Check for an invalid date
  
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

  const dateValue = value ? new Date(value) : undefined
  return (
    <div style={datePickerContainerStyles}>
      <IconButton
        iconProps={{ iconName: 'Up' }}
        onClick={() => handleIncrementHour()}
        style={iconButtonStyles}
      />
      <DatePicker
        value={ dateValue } 
        onSelectDate={handleDateChange}
        formatDate={formatDate}
        placeholder="YYYY-MM-DDTHH:mm:SS"
        disabled={disabled}
      />
      <IconButton
        iconProps={{ iconName: 'Down' }}
        onClick={() => handleDecrementHour()}
        style={iconButtonStyles}
      />
    </div>
  );
};

export default CustomDatePicker;
