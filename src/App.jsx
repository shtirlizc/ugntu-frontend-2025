import React, {useEffect, useState} from 'react';
import { Col, Row, Typography, Table, Button} from 'antd';
import { supabase } from './supabaseClient.js';
import {TaskList} from "./task-list.jsx";

const { Title } = Typography;

function App() {
    const [taskLists, setTaskLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);

    useEffect(() => {
        async function getLists() {
            const { data: lists } = await supabase.from('allLists').select('*');

            if(lists) {
                setTaskLists(lists);
            }
        }

        getLists().then();
    }, []);

    const columns = [
        {
            title: 'List name',
            dataIndex: 'listName',
            id: 'listName',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            id: 'author',
        },
        {
            title: 'CreatedAt',
            dataIndex: 'created_at',
            id: 'created_at',
            render: (_, record) => {
                const date = new Date(record.created_at);
                return date.toDateString();
            }
        },
        {
            dataIndex: 'select',
            id: 'select',
            render: (_, record) => {
                return <Button onClick={() => {
                    setSelectedList(record);
                }}>Select</Button>;
            }
        }
    ];

   return (
       <Row>
           <Col span={12}>
               <Title level={2}>Task lists</Title>

               <Table dataSource={taskLists} columns={columns} pagination={false} />
           </Col>

           <Col span={12}>
               {selectedList !== null && <TaskList id={selectedList.id} name={selectedList.listName} />}
           </Col>
       </Row>

   )
}

export default App
