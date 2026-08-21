import plusIcon from '../images/Plus.png';
import chevronIcon from '../images/Chevron Down.png';
import { useState } from 'react';
import toast from 'react-hot-toast';

const TodoForm = ({addTodo, filter, setFilter}) => {
  const [inputText, setinputText]= useState('');

  const handleSubmit = (e) => {
  e.preventDefault();

  // Trigger toast if input is empty
    if (!inputText.trim()) {
     toast.error('Please enter a task!')
      return;
    }

 addTodo(inputText.trim());
    setinputText('');// Clear input

};
  return (
    <form onSubmit={handleSubmit}
    className="flex justify-between items-center mt-[44px] max-w-[1062px] w-full max-[1050px]:justify-center">
      <input 
        id="inputID" 
        type="text" 
        value={inputText}
        onChange={(e)=> setinputText(e.target.value)}
        className="max-w-[614px] w-full h-[81px] rounded-[8px] text-white/70 text-[35px] backdrop-blur-[12px] bg-[#C4BABA5E]/37 border-1 border-white flex items-center p-4 max-[891px]:max-w-[500px] max-[800px]:max-w-[400px]" 
      />
      <button type="submit" className="bg-transparent border-none p-0 cursor-pointer">
      <img 
        src={plusIcon} 
        id="btn" 
        alt="add todo" 
        className="max-w-[90px] w-full h-[90px]" 
      />
      </button>
      <div className="max-w-[250px] w-full h-[62px] rounded-[2px] text-white/70 text-[35px] backdrop-blur-[12px] bg-[#C4BABA5E]/37 border-1 border-white flex items-center">
        <select 
          className="text-[24px] appearance-none font-[400] font-[baloo] pl-5 text-white w-[250px] focus:outline-none" 
          name="All" 
          id="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all" className="bg-neutral-600">All</option>
          <option value="completed" className="bg-neutral-600">Completed</option>
          <option value="incomplete" className="bg-neutral-600">Incomplete</option>
        </select>
        <img src={chevronIcon} alt="" className="absolute left-[191px] pointer-events-none" />
      </div>
    </form>
  );
};

export default TodoForm;