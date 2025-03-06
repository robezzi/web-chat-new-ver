import React from 'react';
import { ChatComponent } from 'components/modules/Chat/Chat.component';
import { Input } from 'components/forms/Input/Input.component';
import SearchIcon from 'assets/small/search.svg';
import { Menu } from 'components/ui/Menu/Menu.component';
import {
    StyledChatCard,
    StyledMainAside,
    StyledMainAsideTopbar,
    StyledMainLayout,
    StyledMainView,
} from './Main.styled';
import { LMainView } from './Main.view.logic';

export const MainView: React.FC = () => {
    const {
        generateMessage,
        menuStructure,
        searchUser,
        handleSearchUsers,
        chats,
        activeChat,
        handleSetActiveChat,
    } = LMainView();
    return (
        <StyledMainView>
            <StyledMainLayout>
                <StyledMainAside>
                    <StyledMainAsideTopbar>
                        <Menu menu={menuStructure} />
                        <Input
                            type="text"
                            placeholder="Поиск по чатам"
                            value={searchUser}
                            onChange={handleSearchUsers}
                            iconRight={SearchIcon}
                        />
                    </StyledMainAsideTopbar>
                    {chats?.chats.map((chat, index) => (
                        <StyledChatCard
                            key={chat.name}
                            username={chat.name}
                            active={activeChat === index}
                            onClick={() => handleSetActiveChat(index)}
                            message={
                                chat.messages.length
                                    ? generateMessage(
                                          chat.messages[
                                              chat.messages.length - 1
                                          ],
                                      )
                                    : undefined
                            }
                        />
                    ))}
                </StyledMainAside>
                <section>
                    <ChatComponent
                        activeChat={
                            activeChat !== null
                                ? chats?.chats[activeChat]
                                : null
                        }
                    />
                </section>
            </StyledMainLayout>
        </StyledMainView>
    );
};
