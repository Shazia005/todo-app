import { useState } from 'react';
import Swal from 'sweetalert2'; // 1. Added missing SweetAlert import
import { FiEdit2, FiTrash2, FiCheck, FiX, FiCheckCircle, FiCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';


const TodoItem = ({ todo, deleteTodo, toggleComplete, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  if (!todo) return null;

  const handleStartEdit = () => {
    if (todo.completed) return;
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editText.trim()){
      toast.error('Task cannot be empty!');
      return;
    } 
    updateTodo(todo.id, editText.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  // SweetAlert Confirmation for Task Deletion
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      background: '#1f2937',
      color: '#fff',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo(todo.id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your task has been deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff',
        });
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <li className="flex justify-between items-center bg-[#C4BABA5E]/37 backdrop-blur-[32px] border border-white p-4 rounded-[85px] gap-4">
      {isEditing ? (
        <input 
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="bg-transparent text-white text-[28px] border-b border-white focus:outline-none w-full max-w-[420px] px-2"
        />
      ) : (
        <p 
          onDoubleClick={handleStartEdit}
          title={todo.completed ? "Completed tasks cannot be edited" : "Double-click to edit"}
          className={`task-text text-white text-[28px] max-w-[420px] break-words line-clamp-2 ${
            todo.completed ? 'line-through opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {todo.text}
        </p>
      )}

      <div className="flex items-center flex-shrink-0 gap-4 pr-2">
        {isEditing ? (
          <>
            <FiCheck 
              onClick={handleSave}
              title="Save changes"
              className="w-8 h-8 text-green-400 cursor-pointer hover:scale-110 transition-transform" 
            />
            <FiX 
              onClick={handleCancel}
              title="Cancel editing"
              className="w-8 h-8 text-red-400 cursor-pointer hover:scale-110 transition-transform" 
            />
          </>
        ) : (
          <>
            {todo.completed ? (
              <FiCheckCircle 
                onClick={() => toggleComplete(todo.id)}
                className="w-8 h-8 text-green-400 cursor-pointer hover:scale-110 transition-transform"
              />
            ) : (
              <FiCircle 
                onClick={() => toggleComplete(todo.id)}
                className="w-8 h-8 text-white cursor-pointer hover:scale-110 transition-transform"
              />
            )}

            <FiEdit2 
              onClick={handleStartEdit}
              title={todo.completed ? "Cannot edit completed task" : "Edit task"}
              className={`w-8 h-8 transition-transform ${
                todo.completed ? 'opacity-30 cursor-not-allowed text-gray-400' : 'text-white cursor-pointer hover:scale-110'
              }`}
            />

            {/* 2. Updated onClick handler from deleteTodo to handleDelete */}
            <FiTrash2 
              onClick={handleDelete}
              className="w-8 h-8 text-red-400 cursor-pointer hover:scale-110 transition-transform" 
            />
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;