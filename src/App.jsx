
import './App.css'
import React, { useState } from 'react';
import { Input, Button, Flex, Modal } from 'antd';

function App() {
  const [inputText, setInputText] = useState('');
  function handleInputChange(e) {
    setInputText(e.target.value);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setInputText('');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
    <Flex gap={16} align="start">
      <Input value={inputText} onChange={handleInputChange} />
       <Button type="primary" onClick={showModal}>Показать в модальном окне</Button>
    </Flex>

    <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{inputText}</p>
      </Modal>
      </div>
  )
}

export default App
