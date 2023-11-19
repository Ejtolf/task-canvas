import React, { useState } from 'react';

type Message = {
    user: string;
    text: string;
};

const Messenger: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, { user: 'Me', text: inputValue }]);
            setInputValue('');
        }
    };

    return (
        <div>
            <h1>Простой мессенджер</h1>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.user}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <input type="text" value={inputValue} onChange={handleInputChange} style={{ flex: 1, marginRight: '10px' }} />
                <button onClick={handleSendMessage}>Отправить</button>
            </div>
        </div>
    );
};

export default Messenger;
