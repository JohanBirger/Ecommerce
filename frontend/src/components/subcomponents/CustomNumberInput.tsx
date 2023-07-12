import React from 'react';


interface CustomNumberInputProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({ value, onIncrement, onDecrement }) => {

  

  return (
    <div className="flex flex-flow justify-center">
      <button onClick={onDecrement} disabled={value <= 1} className="p-2 border border-black rounded hover:bg-black hover:text-white">
        -
      </button>
      <input
        type="number"
        value={value}
        readOnly
        className="input-number w-16 pl-7 border border-black rounded"
      />
      <button onClick={onIncrement} className="p-2 border border-black rounded hover:bg-black hover:text-white">
        +
      </button>
    </div>
  );
};

export default CustomNumberInput;