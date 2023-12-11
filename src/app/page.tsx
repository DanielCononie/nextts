"use client";
import Image from 'next/image'
import React, { ChangeEventHandler, useState } from 'react';

export default function Home() {

  interface TODO {
    id: string,
    description: string,
    time: Date,
  }

  const [todos, setTodos] = useState<TODO[]>([]);
  const [todo, setTodo] = useState<string>('');
  const [editedTodo, setEditedTodo] = useState<string>('')
  const [error, setError] = useState<string>('');
  const [currentEdit, setCurrentEdit] = useState<string>('');
  
  const addTodo = () => {
    if(todo.length > 0) {

      const randomNum : string = ((Math.random() * 10000) / (Math.random() * 10)).toFixed(0).toString()
      setTodos([...todos, {
        id: randomNum,
        description: todo,
        time: new Date(),
      }])
    } else {
      setError("Please enter a todo first");
    }
    
  }

  const addEditedTodo = () => {
    if (editedTodo.trim() !== '') {
      setTodos((prevTodos) =>
        prevTodos.map((element) =>
          element.id === currentEdit
            ? { ...element, description: editedTodo }
            : element
        )
      );
    }
    setCurrentEdit('');
  }

  return (
    <main className='p-5'>
      <div className='flex flex-col justify-center text-center'>
        <h2 className='text-center'>Add a todo</h2>
        <br />
        <span className='flex justify-center'>
        <input type="text" className='border-2 rounded-lg' 
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>  {
            if(e.key === "Enter") {
              addTodo();
            }
        }} 
        onChange ={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTodo(e.target.value);
          }}/>
          <button className='border-2 hover:bg-slate-200 rounded-lg font-bold text-lg pl-3 pr-3 ml-3' onClick={addTodo}>+</button>
        </span>
        <span style={{color: 'red', fontWeight: 'bold'}}>{error}</span>
      </div>
      <div>
        {todos.map((task, index) => (
          <div key={task.id} className='border-2 w-[70%] mt-2 rounded-lg '>
            <p><small>{task.time.toLocaleDateString()}</small></p>
            <span className='flex'>
              {task.id === currentEdit ? 
                (
                 <>
                   <input 
                   className='border-2 rounded-lg h-8 mr-2 ml-2' 
                   placeholder={`${task.description}...`}
                   onChange ={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEditedTodo(e.target.value);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>  {
                  if(e.key === "Enter") {
                    addEditedTodo();
                  }
              }}/>
                   <button 
                   className='mr-5 mb-3 border-2 hover:bg-slate-200 rounded-lg font-bold text-lg pl-3 pr-3 '
                   onClick={() => {
                    addEditedTodo()
                  }}
                  >
                    Save
                    </button>
                   <button  
                   className='mb-3 border-2 hover:bg-slate-200 rounded-lg font-bold text-lg pl-3 pr-3'
                   onClick={() => setCurrentEdit('')}>
                    Cancel
                    </button>
                 </>
                )
               :
               (
                <>
                  <p className='mr-20 w-[40%] mw-[40%] overflow-x-auto whitespace-pre-wrap ml-2'>{task.description}</p>
                  <button 
                   className='mr-5 mb-3 border-2 hover:bg-slate-200 rounded-lg font-bold text-lg pl-3 pr-3 '
                   onClick={() => setCurrentEdit(task.id)}>
                    Edit
                  </button>
                  <button 
                  className='mb-3 border-2 hover:bg-slate-200 rounded-lg font-bold text-lg pl-3 pr-3'
                  onClick={() => {
                    setTodos(todos.filter((element) => element.id !== task.id))
                  }}>
                     Done
                 </button>
                </>
               )
              } 
             
            </span>
          </div>
        ))}
      </div>
    </main>
  )
}
