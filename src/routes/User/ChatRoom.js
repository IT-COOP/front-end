import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import classNames from "classnames";

import { People, Mascot } from "../../assets/icons";
import useGetChatRoomNumberQuery from "../../hooks/useGetChatRoomNumberQuery";

const socket = io(process.env.REACT_APP_API_URL_SOCKET, {
  extraHeaders: {
    authorization: `Bearer ${localStorage.getItem("coopToken")}`,
  },
});

const ChatRoom = () => {
  const [chatMsg, setChatMsg] = useState("");

  const [userChatList, setUserChatList] = useState([]);

  const chatEndRef = useRef();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [userChatList]);

  useEffect(() => {
    socket.emit("enterChatRoom", 1, data => {
      setUserChatList(data.data.chats);
    });
  }, []);

  const handleChatMsg = inputOnChange => {
    setChatMsg(inputOnChange.target.value);
  };

  useEffect(() => {
    socket.on("msgToClient", ({ chat }) => {
      setUserChatList(prev => [...prev, chat]);
    });
    return () => {
      return;
    };
  }, []);

  const sendChatMsg = submitEvent => {
    submitEvent.preventDefault();
    if (chatMsg === "") {
      return;
    }
    const data = {
      chatRoomId: 1,
      chat: chatMsg,
    };
    socket.emit("msgToServer", data, msg => {
      const { data = [] } = msg;
      setUserChatList(prev => [...prev, data?.chat]);
    });
    setChatMsg("");
  };

  return (
    <section className="w-full bg-white3 pt-[40px] pb-[157px]">
      <div className="w-[1224px]  mx-[auto]  ">
        <div className="flex justify-between w-full mb-[37px]">
          <h1 className="text-[21px] font-bold">
            팀프로젝트 타이틀 들어가는곳
          </h1>
          <div className="px-[12px] py-[6px] bg-white rounded-[20px]">
            <People className="inline-block mr-[10px]" /> 8
          </div>
        </div>
        <div className="bg-white border-[1px] rounded-[8px] flex flex-col">
          <div className="flex flex-col justify-between flex-1 w-full">
            <div className="w-full h-[500px] mb-[20px] overflow-y-auto">
              <p className="w-full mt-[34px] bg-white4 text-center leading-[40px] text-gray4 text-[18px] mb-[30px]">
                채팅방이 시작되었습니다.
              </p>
              <div className="flex items-center justify-center mb-[30px]">
                <Mascot className="mr-[30px]" />
                <h3 className="text-[22px]">
                  시작이 절반!
                  <br />
                  여러분의 프로젝트를 응원합니다!
                </h3>
              </div>
              <ul className="px-[50px]">
                {userChatList?.map(chat => (
                  <li
                    key={chat.chatId}
                    className="flex w-full mb-[30px] flex-reverse"
                  >
                    <div className="w-[60px] h-[60px] overflow-hidden rounded-full mr-[20px]">
                      <img
                        src={chat.speaker2.profileImgUrl}
                        alt={`${chat.speaker2.nickname}의 프로필사진`}
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-[20px] leading-[40px]">
                        {chat.speaker2.nickname}
                      </p>
                      <div className="flex items-end gap-x-[10px]">
                        <p className="bg-white3 p-[10px] text-[18px] rounded-r-[8px] rounded-b-[8px] ">
                          {chat.chat}
                        </p>
                        <span className="text-[16px] leading-[26px] font-light">
                          {chat.createdAt}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div ref={chatEndRef}></div>
            </div>
            <form
              className="px-[50px] pb-[46px] relative"
              onSubmit={sendChatMsg}
            >
              <textarea
                type="text"
                className="text-[18px] resize-none px-[13px] py-[13px] w-full h-[135px] border-[1px]"
                placeholder="메시지를 입력해 주세요."
                onChange={handleChatMsg}
                value={chatMsg}
              />
              <button className="absolute right-[60px] bottom-[55px] px-[15px] py-[6px] text-[22px] text-white bg-gray2 rounded-[5px]">
                전송
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatRoom;
