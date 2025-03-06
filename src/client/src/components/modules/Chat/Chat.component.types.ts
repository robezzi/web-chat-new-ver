import { GetChatsQuery } from 'generated/graphql.types';

export interface IChatComponentProps {
    activeChat?: GetChatsQuery['chats'][number] | null;
}

export interface IChatFormFields {
    message: string;
}
