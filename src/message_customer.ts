module RongIMLib {

    export class CustomerStatusMessage implements MessageContent {
        messageName: string = "CustomerStatusMessage";
        status: number;
        constructor(message: any) {
            this.status = message.status;
        }
        static obtain(): CustomerStatusMessage {
            return null;
        }
        encode(): string {
            return JSON.stringify(ModelUtil.modelClone(this));
        }
    }
    /**
     * 客服转换响应消息的类型名
     */
    /* .en
     * type name of change mode response message
    */
    export class ChangeModeResponseMessage implements MessageContent {
        messageName: string = "ChangeModeResponseMessage";
        code: number;
        data: any;
        msg: string;
        constructor(message: any) {
            this.code = message.code;
            this.data = message.data;
            this.msg = message.msg;
        }

        static obtain(): ChangeModeResponseMessage {
            return null;
        }

        encode(): string {
            return JSON.stringify(ModelUtil.modelClone(this));
        }
    }
    /**
     * 客服转换消息的类型名
     * 此消息不计入未读消息数
     */
    /* .en
     * type name of change mode message
     * This message is not included in the number of unread messages
    */
    export class ChangeModeMessage implements MessageContent {
        messageName: string = "ChangeModeMessage";
        uid: string;
        sid: string;
        pid: string;
        constructor(message: any) {
            this.uid = message.uid;
            this.sid = message.sid;
            this.pid = message.pid;
        }

        static obtain(): ChangeModeMessage {
            return null;
        }

        encode(): string {
            return JSON.stringify(ModelUtil.modelClone(this));
        }
    }

    export class CustomerStatusUpdateMessage implements MessageContent {
        messageName: string = "CustomerStatusUpdateMessage";
        serviceStatus: string;
        sid: string;
        constructor(message: any) {
            this.serviceStatus = message.serviceStatus;
            this.sid = message.sid;
        }
        static obtain(): CustomerStatusUpdateMessage {
            return null;
        }
        encode(): string {
            return JSON.stringify(ModelUtil.modelClone(this));
        }
    }

    export class HandShakeMessage implements MessageContent {
        messageName: string = "HandShakeMessage";
        constructor() { }
        static obtain(): HandShakeMessage {
            return null;
        }
        encode(): string {
            return JSON.stringify(ModelUtil.modelClone(this));
        }
    }

    export class CustomerContact implements MessageContent {
        messageName: string = "CustomerContact";
        page: any;
        nickName: string;
        routingInfo: any;
        info: any;
        requestInfo: any;
        constructor(message: any) {
            this.page = message.page;
            this.nickName = message.nickName;
            this.routingInfo = message.routingInfo;
            this.info = message.info;
            this.requestInfo = message.requestInfo;
        }
        encode(): string {
            return JSON.stringify(ModelUtil.modelClone(this));
        }
    }

    export class EvaluateMessage implements MessageContent {
        messageName: string = "EvaluateMessage";
        uid: string;
        sid: string;
        pid: string;
        source: number; // 1--5
        suggest: string;
        isresolve: boolean;
        type: number;
        constructor(message: any) {
            this.uid = message.uid;
            this.sid = message.sid;
            this.pid = message.pid;
            this.source = message.source;
            this.suggest = message.suggest;
            this.isresolve = message.isresolve;
            this.type = message.type
        }
        static obtain(): EvaluateMessage {
            return null;
        }
        encode(): string {
            return JSON.stringify(ModelUtil.modelClone(this));
        }
    }

    /**
     * 客服握手响应消息的类型名
     */
    /* .en
     * type name of HandShake response message
    */
    export class HandShakeResponseMessage implements MessageContent {
        messageName: string = "HandShakeResponseMessage";
        msg: string;
        status: number;
        data: any;
        constructor(message: any) {
            this.msg = message.msg;
            this.status = message.status;
            this.data = message.data;
        }
        static obtain(): HandShakeResponseMessage {
            return null;
        }
        encode(): string {
            return JSON.stringify(ModelUtil.modelClone(this));
        }
    }

    export class SuspendMessage implements MessageContent {
        messageName: string = "SuspendMessage";
        uid: string;
        sid: string;
        pid: string;
        constructor(message: any) {
            this.uid = message.uid;
            this.sid = message.sid;
            this.pid = message.pid;
        }
        static obtain(): SuspendMessage {
            return null;
        }
        encode(): string {
            return JSON.stringify(ModelUtil.modelClone(this));
        }
    }

    export class TerminateMessage implements MessageContent {
        messageName: string = "TerminateMessage";
        /* .en
         * 0 end session
         * 1 change to robot
        */
        //0结束客服，1自动转为机器人。
        code: number;
        msg: string;
        sid: string;
        constructor(message: any) {
            this.code = message.code;
            this.msg = message.msg;
            this.sid = message.sid;
        }
        static obtain(): TerminateMessage {
            return null;
        }
        encode(): string {
            return JSON.stringify(ModelUtil.modelClone(this));
        }
    }
}
