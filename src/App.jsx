import React, {useEffect, useState} from 'react';


import {  Button, Flex, Input } from 'antd';

import { supabase } from './supabaseClient.js';
import {Task} from "./task.jsx";

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

    const [newTask, setNewTask] = useState('');
    const handleChangeNewTask = (e) => {
        setNewTask(e.target.value);
    }

    const addNewTask = async () => {
        const response = await supabase.from('tasks').insert({ name: newTask.trim(), done: false }).select();

        if (response.error === null) {
            const insertedTask = response.data.at(0);
            setTasks([...tasks, insertedTask]);
            setNewTask('');
        } else {
            console.error('Error adding task', response.error);
        }
    }

    const onUpdateTask = (id, name, done) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
               return {
                   ...task,
                   name,
                   done,
               }
            }

            return task;
        }));
    }
    const onDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const sortedTasks = tasks.sort((a, b) => {
        return a.id - b.id;
    })

  return (
    <Flex vertical gap={16} style={{ maxWidth: 400, padding: 20 }}>
        {sortedTasks.map(task => {
            return (
                <Task key={task.id} task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
            )
        })
    }
        <Input placeholder="New task" value={newTask} onChange={handleChangeNewTask} />
        <Button type="primary" disabled={newTask.trim() === ''} onClick={addNewTask}>Add task</Button>
    </Flex>
  )
}

export default App
