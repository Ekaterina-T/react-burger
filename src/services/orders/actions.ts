import { ActionTypes} from "../actionTypes";

export interface IWSInit_AllOrders {
    readonly type: typeof ActionTypes.wsAllOrders.wsInit;
    readonly socketName: string;
}

export interface IWSOnOpen_AllOrders {
    readonly type: typeof ActionTypes.wsAllOrders.onOpen;
    readonly socketName: string;
}

export interface IWSOnError_AllOrders {
    readonly type: typeof ActionTypes.wsAllOrders.onError;
    readonly payload: {[name:string]: any};
    readonly socketName: string;
}

export interface IWSOnClose_AllOrders {
    readonly type: typeof ActionTypes.wsAllOrders.onClose;
    readonly socketName: string;
}

export interface IWSOnGetMessage_AllOrders {
    readonly type: typeof ActionTypes.wsAllOrders.onGetMessage;
    readonly payload: string;
    readonly socketName: string;
}

export interface IWSOnSendMessage_AllOrders {
    readonly type: typeof ActionTypes.wsAllOrders.wsSendMessage;
    readonly socketName: string;
}


export interface IWSInit_UserOrders {
    readonly type: typeof ActionTypes.wsUserOrders.wsInit;
    readonly socketName: string;
}

export interface IWSOnOpen_UserOrders {
    readonly type: typeof ActionTypes.wsUserOrders.onOpen;
    readonly socketName: string;
}

export interface IWSOnError_UserOrders {
    readonly type: typeof ActionTypes.wsUserOrders.onError;
    readonly payload: {[name:string]: any};
    readonly socketName: string;
}

export interface IWSOnClose_UserOrders {
    readonly type: typeof ActionTypes.wsUserOrders.onClose;
    readonly socketName: string;
}

export interface IWSOnGetMessage_UserOrders {
    readonly type: typeof ActionTypes.wsUserOrders.onGetMessage;
    readonly payload: string;
    readonly socketName: string;
}

export interface IWSOnSendMessage_UserOrders {
    readonly type: typeof ActionTypes.wsUserOrders.wsSendMessage;
    readonly socketName: string;
}

export type TWSOrderActions =  | IWSInit_AllOrders| IWSOnOpen_AllOrders | IWSOnError_AllOrders 
| IWSOnClose_AllOrders |IWSOnGetMessage_AllOrders | IWSOnSendMessage_AllOrders
| IWSInit_UserOrders |IWSOnOpen_UserOrders | IWSOnError_UserOrders 
| IWSOnClose_UserOrders | IWSOnGetMessage_UserOrders | IWSOnSendMessage_UserOrders;