"use client";
import Image from 'next/image'
import React, { ChangeEventHandler, useState } from 'react';

export default function Home() {

  interface TODO {
    description: string,
    time: Date,
  }

  const [todo, setTodo] = useState<TODO[]>([]);


  return (
    <main className='p-5'>
      <div>
        <label htmlFor="">Add a todo</label>
        <input type="text" className='border-2' onChange ={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTodo([...todo, {
              description: e.target.value,
              time: new Date(),
            }])
        }}/>
        <button>Add todo</button>
      </div>
    </main>
  )
}
