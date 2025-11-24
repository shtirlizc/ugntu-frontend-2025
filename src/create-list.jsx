import { Button, Modal, Form, Input, Flex } from 'antd';
import {useState} from "react";

import { supabase } from './supabaseClient.js';

export const CreateList = (props) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        const response = await supabase.from('allLists').insert({ listName: values.listName, author: values.author }).select();

        if (response.error === null) {
            const insertedList = response.data.at(0);
            props.onListCreated(insertedList);
            form.resetFields();
            setIsModalOpen(false);
        } else {
            console.error('Error adding list', response.error);
        }
    };
    const onFinishFailed = errorInfo => {
        console.error('Failed:', errorInfo);
    };

    return <>
        <Button type="primary" onClick={showModal}>
            Add task list
        </Button>

        <Modal
            title="New task list"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            footer={null}
        >
            <Form
                name="list"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, paddingTop: 40 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="List name"
                    name="listName"
                    rules={[{ required: true, message: 'Please input list name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Author"
                    name="author"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label={null}>
                    <Flex gap={12} justify='end'>
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Modal>
    </>
};