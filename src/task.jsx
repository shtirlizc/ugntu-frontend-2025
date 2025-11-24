import {Checkbox, Button, Flex, Input} from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React from "react";

import { supabase } from './supabaseClient.js';

export const Task = (props) => {
    const { task } = props;

    const [isEditMode, setIsEditMode] = React.useState(false);
    const [taskName, setTaskName] = React.useState(task.name);

    const handleEditTask = () => {
        setIsEditMode(true);
    }

    const handleChangeTaskName = (e) => {
        setTaskName(e.target.value);
    }

    const handleRenameTask = async () => {
        setIsEditMode(false);

        const response = await supabase.from('tasks').update({ name: taskName.trim() }).eq('id', task.id);

        if (response.error === null) {
            props.onUpdateTask(task.id, taskName.trim(), task.done);
        } else {
            console.error('Error editing task', response.error);
        }
    }

    const handleDoneTask = async (e) => {
        const response = await supabase.from('tasks').update({ done: e.target.checked }).eq('id', task.id);

        if (response.error === null) {
            props.onUpdateTask(task.id, task.name, e.target.checked);
        } else {
            console.error('Error editing task', response.error);
        }
    }

    const handleDeleteTask = async () => {
        const response = await supabase.from('tasks').delete().eq('id', task.id);

        if (response.error === null) {
            props.onDeleteTask(task.id);
        } else {
            console.error('Error deleting task', response.error);
        }
    }

    if (isEditMode) {
        return <Flex gap={12} align='center'>
            <Input placeholder="Task name" value={taskName} onChange={handleChangeTaskName} />
            <Button type="primary" disabled={taskName.trim() === ''} onClick={handleRenameTask}>Rename</Button>
        </Flex>
    }

    return (
        <Checkbox checked={task.done} onChange={handleDoneTask}>
            <Flex gap={12} align='center'>
                <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={handleEditTask} disabled={task.done} />
                <Button type="primary" shape="circle" icon={<DeleteOutlined />} danger onClick={handleDeleteTask} />
                {task.name}
            </Flex>
        </Checkbox>
    )
}