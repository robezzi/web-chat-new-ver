import { NewChatCreatedSubscription } from 'generated/graphql.types';

export interface ISubscriptionData {
    subscriptionData: {
        data?: NewChatCreatedSubscription;
    };
}
