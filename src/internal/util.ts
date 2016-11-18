/* .en
 * object name mapping
*/
//objectname映射
var typeMapping: { [s: string]: any } = {
    "RC:TxtMsg": "TextMessage",
    "RC:ImgMsg": "ImageMessage",
    "RC:VcMsg": "VoiceMessage",
    "RC:ImgTextMsg": "RichContentMessage",
    "RC:LBSMsg": "LocationMessage",
    "RC:InfoNtf": "InformationNotificationMessage",
    "RC:ContactNtf": "ContactNotificationMessage",
    "RC:ProfileNtf": "ProfileNotificationMessage",
    "RC:CmdNtf": "CommandNotificationMessage",
    "RC:DizNtf": "DiscussionNotificationMessage",
    "RC:CmdMsg": "CommandMessage",
    "RC:TypSts": "TypingStatusMessage",
    "RC:CsChaR": "ChangeModeResponseMessage",
    "RC:CsHsR": "HandShakeResponseMessage",
    "RC:CsEnd": "TerminateMessage",
    "RC:CsSp": "SuspendMessage",
    "RC:CsUpdate": "CustomerStatusUpdateMessage",
    "RC:ReadNtf": "ReadReceiptMessage",
    "RC:VCAccept": "AcceptMessage",
    "RC:VCRinging": "RingingMessage",
    "RC:VCSummary": "SummaryMessage",
    "RC:VCHangup": "HungupMessage",
    "RC:VCInvite": "InviteMessage",
    "RC:VCModifyMedia": "MediaModifyMessage",
    "RC:VCModifyMem": "MemberModifyMessage",
    "RC:CsContact": "CustomerContact"
},
    /* .en
     * custom message type
    */
    //自定义消息类型
    registerMessageTypeMapping: { [s: string]: any } = {},
    HistoryMsgType: { [s: number]: any } = {
        4: "qryCMsg",
        2: "qryDMsg",
        3: "qryGMsg",
        1: "qryPMsg",
        6: "qrySMsg",
        7: "qryPMsg",
        8: "qryPMsg",
        5: "qryCMsg"
    }, disconnectStatus: { [s: number]: any } = { 1: 6 };
module RongIMLib {
    /**
     * 通道标识类
     */
    /* .en
     * class of channels identifier
    */
    export class Transportations {
        static _TransportType: string = Socket.WEBSOCKET;
    }
    export class PublicServiceMap {
        publicServiceList: Array<any>;
        constructor() {
            this.publicServiceList = [];
        }
        get(publicServiceType: ConversationType, publicServiceId: string): PublicServiceProfile {
            for (let i = 0, len = this.publicServiceList.length; i < len; i++) {
                if (this.publicServiceList[i].conversationType == publicServiceType && publicServiceId == this.publicServiceList[i].publicServiceId) {
                    return this.publicServiceList[i];
                }
            }
        }
        add(publicServiceProfile: PublicServiceProfile) {
            var isAdd: boolean = true, me = this;
            for (let i = 0, len = this.publicServiceList.length; i < len; i++) {
                if (me.publicServiceList[i].conversationType == publicServiceProfile.conversationType && publicServiceProfile.publicServiceId == me.publicServiceList[i].publicServiceId) {
                    this.publicServiceList.unshift(this.publicServiceList.splice(i, 1)[0]);
                    isAdd = false;
                    break;
                }
            }
            if (isAdd) {
                this.publicServiceList.unshift(publicServiceProfile);
            }
        }
        replace(publicServiceProfile: PublicServiceProfile) {
            var me = this;
            for (let i = 0, len = this.publicServiceList.length; i < len; i++) {
                if (me.publicServiceList[i].conversationType == publicServiceProfile.conversationType && publicServiceProfile.publicServiceId == me.publicServiceList[i].publicServiceId) {
                    me.publicServiceList.splice(i, 1, publicServiceProfile);
                    break;
                }
            }
        }
        remove(conversationType: ConversationType, publicServiceId: string) {
            var me = this;
            for (let i = 0, len = this.publicServiceList.length; i < len; i++) {
                if (me.publicServiceList[i].conversationType == conversationType && publicServiceId == me.publicServiceList[i].publicServiceId) {
                    this.publicServiceList.splice(i, 1);
                    break;
                }
            }
        }
    }
    /**
     * 会话工具类。
     */
    /* .en
     * class of session tools
    */
    export class ConversationMap {
        conversationList: Array<Conversation>;
        constructor() {
            this.conversationList = [];
        }
        get(conversavtionType: number, targetId: string): Conversation {
            for (let i = 0, len = this.conversationList.length; i < len; i++) {
                if (this.conversationList[i].conversationType == conversavtionType && this.conversationList[i].targetId == targetId) {
                    return this.conversationList[i];
                }
            }
            return null;
        }
        add(conversation: Conversation): void {
            var isAdd: boolean = true;
            for (let i = 0, len = this.conversationList.length; i < len; i++) {
                if (this.conversationList[i].conversationType === conversation.conversationType && this.conversationList[i].targetId === conversation.targetId) {
                    this.conversationList.unshift(this.conversationList.splice(i, 1)[0]);
                    isAdd = false;
                    break;
                }
            }
            if (isAdd) {
                this.conversationList.unshift(conversation);
            }
        }
        /**
         * [replace 替换会话]
         * 会话数组存在的情况下调用add方法会是当前会话被替换且返回到第一个位置，导致用户本地一些设置失效，所以提供replace方法
         */
        /* .en
         * [replace session]
        */
        replace(conversation: Conversation) {
            for (let i = 0, len = this.conversationList.length; i < len; i++) {
                if (this.conversationList[i].conversationType === conversation.conversationType && this.conversationList[i].targetId === conversation.targetId) {
                    this.conversationList.splice(i, 1, conversation);
                    break;
                }
            }
        }
        remove(conversation: Conversation) {
            for (let i = 0, len = this.conversationList.length; i < len; i++) {
                if (this.conversationList[i].conversationType === conversation.conversationType && this.conversationList[i].targetId === conversation.targetId) {
                    this.conversationList.splice(i, 1);
                    break;
                }
            }
        }
    }
    /**
     * 工具类
     */
    /* .en
     * class of tools
    */
    export class MessageUtil {
        /* .en
         * adapt SSL
        */
        //适配SSL
        static schemeArrs: Array<any> = [["http", "ws"], ["https", "wss"]];
        static sign: any = { converNum: 1, msgNum: 1, isMsgStart: true, isConvStart: true };
        static supportLargeStorage(): boolean {
            if (window.localStorage) {
                return true;
            } else {
                return false;
            }
        }
        /**
         *4680000 为localstorage最小容量5200000字节的90%，超过90%将删除之前过早的存储
         */
        /* .en
         * 4680000 for localstorage minimum capacity, more than will delete early before storage
        */
        static checkStorageSize(): boolean {
            return JSON.stringify(localStorage).length < 4680000;
        }

        static isEmpty(obj: any): boolean {
            var empty: boolean = true;
            for (var key in obj) {
                empty = false;
                break;
            }
            return empty;
        }

        static ArrayForm(typearray: any): Array<any> {
            if (Object.prototype.toString.call(typearray) == "[object ArrayBuffer]") {
                var arr = new Int8Array(typearray);
                return [].slice.call(arr);
            }
            return typearray;
        }
        static ArrayFormInput(typearray: any): Uint8Array {
            if (Object.prototype.toString.call(typearray) == "[object ArrayBuffer]") {
                var arr = new Uint8Array(typearray);
                return arr;
            }
            return typearray;
        }
        static indexOf(arr?: any, item?: any, from?: any): number {
            for (var l = arr.length, i = (from < 0) ? Math.max(0, +from) : from || 0; i < l; i++) {
                if (arr[i] == item) {
                    return i;
                }
            }
            return -1;
        }
        static isArray(obj: any) {
            return Object.prototype.toString.call(obj) == "[object Array]";
        }
        /* .en
         * traverse array only
        */
        //遍历，只能遍历数组
        static forEach(arr: any, func: any) {
            if ([].forEach) {
                return function(arr: any, func: any) {
                    [].forEach.call(arr, func);
                };
            } else {
                return function(arr: any, func: any) {
                    for (var i = 0; i < arr.length; i++) {
                        func.call(arr, arr[i], i, arr);
                    }
                };
            }
        }
        static remove(array: any, func: any): void {
            for (var i = 0, len = array.length; i < len; i++) {
                if (func(array[i])) {
                    return array.splice(i, 1)[0];
                }
            }
            return null;
        }
        static int64ToTimestamp(obj: any, isDate?: boolean) {
            if (obj.low === undefined) {
                return obj;
            }
            var low = obj.low;
            if (low < 0) {
                low += 0xffffffff + 1;
            }
            low = low.toString(16);
            var timestamp = parseInt(obj.high.toString(16) + "00000000".replace(new RegExp("0{" + low.length + "}$"), low), 16);
            if (isDate) {
                return new Date(timestamp);
            }
            return timestamp;
        }
        /* .en
         * function of message parser
        */
        //消息转换方法
        static messageParser(entity: any, onReceived?: any, offlineMsg?: boolean): any {
            var message: Message = new Message(), content: any = entity.content, de: any, objectName: string = entity.classname, val: any, isUseDef = false;
            try {
                if (RongIMClient._memoryStore.global["WEB_XHR_POLLING"]) {
                    val = new BinaryHelper().readUTF(content.offset ? MessageUtil.ArrayForm(content.buffer).slice(content.offset, content.limit) : content);
                    de = JSON.parse(val);
                } else {
                    val = new BinaryHelper().readUTF(content.offset ? MessageUtil.ArrayFormInput(content.buffer).subarray(content.offset, content.limit) : content);
                    de = JSON.parse(val);
                }

            } catch (ex) {
                de = val;
                isUseDef = true;
            }
            /* .en
             * mapping to message object
            */
            //映射为具体消息对象
            if (objectName in typeMapping) {
                var str = "new RongIMLib." + typeMapping[objectName] + "(de)";
                message.content = eval(str);
                message.messageType = typeMapping[objectName];
            } else if (objectName in registerMessageTypeMapping) {
                var str = "new RongIMLib.RongIMClient.RegisterMessage." + registerMessageTypeMapping[objectName] + "(de)";
                if (isUseDef) {
                    message.content = eval(str).decode(de);
                } else {
                    message.content = eval(str);
                }
                message.messageType = registerMessageTypeMapping[objectName];
            } else {
                message.content = new UnknownMessage({ content: de, objectName: objectName });
                message.messageType = "UnknownMessage";
            }
            /* .en
             * set message object base on entry
            */
            //根据实体对象设置message对象
            message.sentTime = MessageUtil.int64ToTimestamp(entity.dataTime);
            message.senderUserId = entity.fromUserId;
            message.conversationType = entity.type;
            if (entity.fromUserId == Bridge._client.userId) {
                message.targetId = entity.groupId;
            } else {
                message.targetId = (/^[234]$/.test(entity.type || entity.getType()) ? entity.groupId : message.senderUserId);
            }
            if (entity.direction == 1) {
                message.messageDirection = MessageDirection.SEND;
                message.senderUserId = Bridge._client.userId;
            } else {
                if (message.senderUserId == Bridge._client.userId) {
                    message.messageDirection = MessageDirection.SEND;
                } else {
                    message.messageDirection = MessageDirection.RECEIVE;
                }
            }
            if ((entity.status & 2) == 2) {
                message.receivedStatus = ReceivedStatus.RETRIEVED;
            }
            message.messageUId = entity.msgId;
            message.receivedTime = new Date().getTime();
            message.messageId = (message.conversationType + "_" + ~~(Math.random() * 0xffffff));
            message.objectName = objectName;
            message.offLineMessage = offlineMsg ? true : false;
            return message;
        }
    }
    export class MessageIdHandler {
        static messageId: number = 0;
        static isXHR: boolean = window["WEB_XHR_POLLING"];
        static init() {
            this.messageId = +(RongIMClient._cookieHelper.getItem(Navigation.Endpoint.userId + "msgId") || RongIMClient._cookieHelper.setItem(Navigation.Endpoint.userId + "msgId", 0) || 0);
        }
        static messageIdPlus(method: any): any {
            this.isXHR && this.init();
            if (this.messageId >= 65535) {
                method();
                return false;
            }
            this.messageId++;
            this.isXHR && RongIMClient._cookieHelper.setItem(Navigation.Endpoint.userId + "msgId", this.messageId);
            return this.messageId;
        }
        static clearMessageId() {
            this.messageId = 0;
            this.isXHR && RongIMClient._cookieHelper.setItem(Navigation.Endpoint.userId + "msgId", this.messageId);
        }
        static getMessageId() {
            this.isXHR && this.init();
            return this.messageId;
        }
    }
    export class CheckParam {
        static getInstance(): CheckParam {
            return new CheckParam();
        }
        check(f: any, position: string, d?: any) {
            var c = arguments.callee.caller;
            if ("_client" in Bridge || d) {
                for (var g = 0, e = c.arguments.length; g < e; g++) {
                    if (!new RegExp(this.getType(c.arguments[g])).test(f[g])) {
                        throw new Error("The index of " + g + " parameter was wrong type " + this.getType(c.arguments[g]) + " [" + f[g] + "] -> position:" + position);
                    }
                }
            } else {
                throw new Error("The parameter is incorrect or was not yet instantiated RongIMClient -> position:" + position);
            }
        }
        getType(str: string): string {
            var temp = Object.prototype.toString.call(str).toLowerCase();
            return temp.slice(8, temp.length - 1);
        }
        checkCookieDisable(): boolean {
            document.cookie = "checkCookie=1";
            var arr = document.cookie.match(new RegExp("(^| )checkCookie=([^;]*)(;|$)")), isDisable = false;
            if (!arr) {
                isDisable = true;
            }
            document.cookie = "checkCookie=1;expires=Thu, 01-Jan-1970 00:00:01 GMT";
            return isDisable;
        }
    }
    export class LimitableMap {
        map: any;
        keys: any;
        limit: number;
        constructor(limit?: number) {
            this.map = {};
            this.keys = [];
            this.limit = limit || 10;
        }
        set(key: string, value: any): void {
            if (this.map.hasOwnProperty(key)) {
                if (this.keys.length === this.limit) {
                    var firstKey = this.keys.shift();
                    delete this.map[firstKey];
                }
                this.keys.push(key);
            }
            this.map[key] = value;
        }
        get(key: string): number {
            return this.map[key] || 0;
        }
        remove(key: string): void {
            delete this.map[key];
        }
    }
}
