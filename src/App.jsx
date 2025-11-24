import React, {useEffect, useState} from 'react';
import { Col, Row, Typography, Table, Button, Flex} from 'antd';
import { supabase } from './supabaseClient.js';
import {TaskList} from "./task-list.jsx";
import {CreateList} from "./create-list.jsx";

const { Title } = Typography;

function App() {
    const [taskLists, setTaskLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);

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
                }} disabled={record.id === selectedList?.id}>
                    Select
                </Button>;
            }
        }
    ];

    useEffect(() => {
        async function getLists() {
            const { data: lists } = await supabase.from('allLists').select('*');

            if(lists) {
                setTaskLists(lists);
            }
        }

        getLists().then();
    }, []);

    const onListCreated = (list) => {
        setTaskLists([...taskLists, list]);
    }

   return (
       <Row>
           <Col span={12} style={{padding: 20}}>
               <Title level={2}>Task lists</Title>

               <Flex vertical gap={20} align='end'>
                   <Table dataSource={taskLists} columns={columns} pagination={false} style={{ width: '100%' }} />
                   <CreateList onListCreated={onListCreated} />
               </Flex>
           </Col>

           <Col span={12} style={{padding: 20}}>
               {selectedList !== null && <TaskList id={selectedList.id} name={selectedList.listName} />}
           </Col>
       </Row>

   )
}

export default App
