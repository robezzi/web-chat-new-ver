import React from 'react';
import {
    StyledChat,
    StyledChatContent,
    StyledChatInput,
    StyledChatInputContainer,
    StyledChatInputTelegramIcon,
    StyledChatMessage,
    StyledChatName,
    StyledChatTopBar,
} from './Chat.component.styled';
import { IChatComponentProps } from './Chat.component.types';
import { LChatComponent } from './Chat.component.logic';

export const ChatComponent: React.FC<IChatComponentProps> = ({
    activeChat,
}) => {
    const { isMessageOwner, onSubmit, register, chatRef } =
        LChatComponent(activeChat);

    return (
        <StyledChat>
            <StyledChatTopBar>
                <StyledChatName>{activeChat?.name}</StyledChatName>
            </StyledChatTopBar>
            <StyledChatContent ref={chatRef}>
                {activeChat?.messages.map((message) => (
                    <StyledChatMessage
                        key={message.id}
                        date={new Date(Number(message.date))}
                        message={message.message}
                        isOwner={isMessageOwner(message)}
                    />
                ))}
            </StyledChatContent>
            <form onSubmit={onSubmit}>
                <StyledChatInputContainer>
                    <StyledChatInput
                        autoComplete="off"
                        type="text"
                        disabled={!activeChat}
                        placeholder="Написать сообщение"
                        {...register('message')}
                    />
                    <StyledChatInputTelegramIcon
                        color={!activeChat ? '#5A5A5A' : undefined}
                        onClick={onSubmit}
                    />
                </StyledChatInputContainer>
            </form>
        </StyledChat>
    );
};
