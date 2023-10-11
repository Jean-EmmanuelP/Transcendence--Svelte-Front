import type { Record } from "./public/record";
import { Testing$result, Testing$input } from "../artifacts/Testing";
import { TestingStore } from "../plugins/houdini-svelte/stores/Testing";

type GetMessageInput = {
    channelId: string;
};

export declare type CacheTypeDef = {
    types: {
        ChannelDTO: {
            idFields: {
                id: string;
            };
            fields: {
                id: {
                    type: string;
                    args: never;
                };
                isPrivate: {
                    type: boolean;
                    args: never;
                };
                name: {
                    type: string;
                    args: never;
                };
                ownerId: {
                    type: string;
                    args: never;
                };
                password: {
                    type: string | null;
                    args: never;
                };
            };
            fragments: [];
        };
        ChannelModel: {
            idFields: {
                id: string;
            };
            fields: {
                createdAt: {
                    type: any;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                isDirectMessage: {
                    type: boolean;
                    args: never;
                };
                isPrivate: {
                    type: boolean;
                    args: never;
                };
                members: {
                    type: (Record<CacheTypeDef, "UserModel">)[];
                    args: never;
                };
                message: {
                    type: (Record<CacheTypeDef, "MessageModel">)[];
                    args: never;
                };
                name: {
                    type: string;
                    args: never;
                };
                owner: {
                    type: Record<CacheTypeDef, "UserModel"> | null;
                    args: never;
                };
                password: {
                    type: string | null;
                    args: never;
                };
                updatedAt: {
                    type: any;
                    args: never;
                };
            };
            fragments: [];
        };
        ChannelOutputDTO: {
            idFields: {
                id: string;
            };
            fields: {
                admins: {
                    type: (Record<CacheTypeDef, "UserOutputDTO">)[];
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                isDirectMessage: {
                    type: boolean;
                    args: never;
                };
                isPrivate: {
                    type: boolean;
                    args: never;
                };
                members: {
                    type: (Record<CacheTypeDef, "UserOutputDTO">)[];
                    args: never;
                };
                name: {
                    type: string;
                    args: never;
                };
                owner: {
                    type: Record<CacheTypeDef, "UserOutputDTO"> | null;
                    args: never;
                };
                ownerId: {
                    type: string | null;
                    args: never;
                };
            };
            fragments: [];
        };
        CreateChannelOutput: {
            idFields: never;
            fields: {
                channel: {
                    type: Record<CacheTypeDef, "ChannelDTO"> | null;
                    args: never;
                };
                error: {
                    type: string | null;
                    args: never;
                };
                success: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        DeleteMessageOutput: {
            idFields: never;
            fields: {
                error: {
                    type: string | null;
                    args: never;
                };
                success: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        MessageDTO: {
            idFields: {
                id: string;
            };
            fields: {
                content: {
                    type: string;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        MessageModel: {
            idFields: {
                id: string;
            };
            fields: {
                channel: {
                    type: Record<CacheTypeDef, "ChannelModel"> | null;
                    args: never;
                };
                channelId: {
                    type: string;
                    args: never;
                };
                content: {
                    type: string;
                    args: never;
                };
                createdAt: {
                    type: any;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                user: {
                    type: Record<CacheTypeDef, "UserModel"> | null;
                    args: never;
                };
                userId: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        OperationResult: {
            idFields: never;
            fields: {
                error: {
                    type: string | null;
                    args: never;
                };
                success: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        __ROOT__: {
            idFields: {};
            fields: {
                getAllFriendsOfUser: {
                    type: (Record<CacheTypeDef, "UserModel">)[];
                    args: never;
                };
                getMessages: {
                    type: ((Record<CacheTypeDef, "MessageModel"> | null))[];
                    args: {
                        input: GetMessageInput;
                    };
                };
                getUsersChannel: {
                    type: ((Record<CacheTypeDef, "ChannelOutputDTO"> | null))[];
                    args: never;
                };
                testingConnexion: {
                    type: string;
                    args: never;
                };
                userInformation: {
                    type: Record<CacheTypeDef, "UserModel">;
                    args: never;
                };
                users: {
                    type: (Record<CacheTypeDef, "UserModel">)[];
                    args: never;
                };
            };
            fragments: [];
        };
        SendMessageOutput: {
            idFields: never;
            fields: {
                error: {
                    type: string | null;
                    args: never;
                };
                message: {
                    type: Record<CacheTypeDef, "MessageDTO"> | null;
                    args: never;
                };
                success: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        UpdateMessageOutput: {
            idFields: never;
            fields: {
                error: {
                    type: string | null;
                    args: never;
                };
                success: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        UserModel: {
            idFields: {
                id: string;
            };
            fields: {
                avatar: {
                    type: string;
                    args: never;
                };
                email: {
                    type: string;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                isTwoFactorEnabled: {
                    type: boolean;
                    args: never;
                };
                name: {
                    type: string;
                    args: never;
                };
                password: {
                    type: string;
                    args: never;
                };
                pseudo: {
                    type: string;
                    args: never;
                };
                status: {
                    type: string;
                    args: never;
                };
                twoFactorSecret: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        UserOutputDTO: {
            idFields: never;
            fields: {
                avatar: {
                    type: string;
                    args: never;
                };
                name: {
                    type: string;
                    args: never;
                };
                status: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
    };
    lists: {};
    queries: [[TestingStore, Testing$result, Testing$input]];
};