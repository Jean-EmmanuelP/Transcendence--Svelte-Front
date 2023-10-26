export interface Conversation {
	name: string;
	avatar: string;
	lastmessage_author: string;
	lastmessage_content: string;
	lastmessage_hour: string;
}

export interface MessageInterface {
	id: string,
	content: string,
	userId: string,
	createdAt: Date
}

export interface Request {
	id: string;
	senderId: string;
	receiverId: string;
	status: string;
	sender: {
		avatar: string;
		name: string;
		pseudo: string;
	};
}

export interface searchUser {
	id: string;
	email: string;
	name: string;
	pseudo: string;
	avatar: string;
	status: string;
}

export interface GroupMemberInterface {
    name: string;
    avatar: string;
    status: string;
}

export interface GroupInterface {
    id: string;
    name: string;
    isPrivate: boolean;
    isDirectMessage: boolean;
    ownerId: string;
    owner: GroupMemberInterface[];
    members: GroupMemberInterface[];
    admins: GroupMemberInterface[];
}

export interface RequestUserInterface {
	id: string;
	avatar: string;
	name: string;
	pseudo: string;
}

export interface FriendRequestInterface {
	id: string;
	senderId: string;
	receiverId: string;
	status: string;
	receiver: RequestUserInterface;
	sender: RequestUserInterface;
}

export enum GroupActions {
	KICK = "KICK",
	BAN = "BAN",
	MUTE = "MUTE",
	UNMUTE = "UNMUTE",
	UNBAN = "UNBAN",
	ADD = "ADD",
	UPADMIN = "UPADMIN",
	DOWNADMIN = "DOWNADMIN",
  }
