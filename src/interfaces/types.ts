export interface Conversation {
	name: string;
	avatar: string;
	lastmessage_author: string;
	lastmessage_content: string;
	lastmessage_hour: string;
}

export interface Message {
	sender: string;
	text: string;
}

export interface Request {
	id: string;
	senderId: string;
	receiverId: string;
	status: string;
}
