import {
    GetChatsQuery,
    useGetUserQuery,
    useSendMessageMutation,
} from 'generated/graphql.types';
import { useNotCurrentUser } from 'hooks/NotCurrentUser.hook';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { IChatComponentProps, IChatFormFields } from './Chat.component.types';

export const LChatComponent = (
    activeChat: IChatComponentProps['activeChat'],
) => {
    const chatUsers = activeChat?.users;
    const chatRef = useRef<HTMLDivElement>(null);
    // CURRENT USER
    const { data: currentUser } = useGetUserQuery();
    const notCurrentUser = useNotCurrentUser(chatUsers);

    useEffect(() => {
        const newMessageUserId =
            activeChat &&
            activeChat.messages[activeChat.messages.length - 1]?.user.id;

        if (newMessageUserId) {
            chatRef.current?.scrollTo(0, chatRef.current?.scrollHeight);
        }
    }, [activeChat?.messages]);

    // MESSAGE SENDING STUFF
    const [sendMessage] = useSendMessageMutation();

    const { register, handleSubmit, reset } = useForm<IChatFormFields>();

    const onSubmit = handleSubmit(async (values) => {
        if (values.message) {
            await sendMessage({
                variables: {
                    input: {
                        message: values.message,
                        chatId: activeChat?.id,
                        contactId: notCurrentUser?.id,
                    },
                },
            });
            reset();
        }
    });

    const isMessageOwner = (
        message: NonNullable<
            GetChatsQuery['chats'][number]
        >['messages'][number],
    ) => {
        return currentUser?.getUser.id === message?.user?.id;
    };

    return {
        isMessageOwner,
        onSubmit,
        register,
        chatRef,
    };
};
