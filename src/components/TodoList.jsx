import TodoItem from './TodoItem';

const TodoList = ({todos, deleteTodo, toggleComplete, updateTodo}) => {
  return (
    <div className="max-h-[calc(100vh-350px)] overflow-y-auto scrollbar-none mt-[75px]">
      <ul id="list" className="mx-auto max-w-[735px] w-full text-white text-[28px] flex flex-col gap-6">
        {todos && todos.map((todo) =>(
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleComplete={toggleComplete} updateTodo={updateTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;