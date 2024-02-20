import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

export const Chat = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get('/api/chat/rooms', {
          headers: { 'Content-Type': 'application/json'},
        });
        console.log('서버응답:', response);
        setChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <Layout>
    <div className='chatting' style={{ display: 'flex', height: '90vh', fontFamily: 'Arial, sans-serif' }}>
      <div className='chatlist' style={{ flex: 1, overflowY: 'auto', borderRight: '1px solid #ccc', padding: '20px' }}>
        {chatRooms.map((room) => (
          <div key={room.roomId} style={{ marginBottom: '10px', cursor: 'pointer', padding: '10px', borderRadius: '5px', backgroundColor: '#f0f0f0' }}
               onClick={() => setSelectedChatRoom(room)}>
            {room.name}
          </div>
        ))}
      </div>
      <div className='chat' style={{ flex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ overflowY: 'auto', padding: '20px' }}>
          {selectedChatRoom ? (
            <>
              <h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>{selectedChatRoom.name}</h2>
              {/* 채팅 메시지 목록을 여기에 표시합니다. 예: <ChatMessages roomId={selectedChatRoom.roomId} /> */}
              {/* 채팅 내용이 여기에 들어갑니다. */}
              <p style={{ marginTop: '20px' }}>메시지가 여기에 표시됩니다...</p>
            </>
          ) : (
            <p>채팅방을 선택해주세요.</p>
          )}
        </div>
        {selectedChatRoom && (
          <div style={{ borderTop: '1px solid #ccc', padding: '20px' }}>
            <input type="text" placeholder="메시지를 입력하세요..." style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};
