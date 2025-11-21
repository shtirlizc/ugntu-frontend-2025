
import './App.css'
import React, {useEffect, useState} from 'react';
import { supabase } from './supabaseClient.js';

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
       async function getTodos() {
            const { data: todos } = await supabase.from('tasks').select('*');

            if(todos) {
                setTasks(todos);
            }
        }

        getTodos().then();
    }, []);

  return (
    <div>{
        tasks.map(task => {
            return (
                <div key={task.id}>
                    <span>{task.name}</span>{' '}
                    <input type="checkbox" checked={task.done} />
                </div>
            )
        })
    }</div>
  )
}

export default App
