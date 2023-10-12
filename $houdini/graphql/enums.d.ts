
type ValuesOf<T> = T[keyof T]
	
export declare const UserAction: {
    readonly ADD: "ADD";
    readonly BAN: "BAN";
    readonly DOWNADMIN: "DOWNADMIN";
    readonly KICK: "KICK";
    readonly MUTE: "MUTE";
    readonly UNBAN: "UNBAN";
    readonly UNMUTE: "UNMUTE";
    readonly UPADMIN: "UPADMIN";
}

export type UserAction$options = ValuesOf<typeof UserAction>
 