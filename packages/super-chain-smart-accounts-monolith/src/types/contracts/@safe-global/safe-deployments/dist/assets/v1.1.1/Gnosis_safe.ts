/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../../../common";

export interface Gnosis_safeInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "NAME"
      | "VERSION"
      | "addOwnerWithThreshold"
      | "approvedHashes"
      | "changeMasterCopy"
      | "changeThreshold"
      | "disableModule"
      | "domainSeparator"
      | "enableModule"
      | "execTransactionFromModule"
      | "execTransactionFromModuleReturnData"
      | "getModules"
      | "getModulesPaginated"
      | "getOwners"
      | "getThreshold"
      | "isOwner"
      | "nonce"
      | "removeOwner"
      | "setFallbackHandler"
      | "signedMessages"
      | "swapOwner"
      | "setup"
      | "execTransaction"
      | "requiredTxGas"
      | "approveHash"
      | "signMessage"
      | "isValidSignature"
      | "getMessageHash"
      | "encodeTransactionData"
      | "getTransactionHash"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AddedOwner"
      | "ApproveHash"
      | "ChangedMasterCopy"
      | "ChangedThreshold"
      | "DisabledModule"
      | "EnabledModule"
      | "ExecutionFailure"
      | "ExecutionFromModuleFailure"
      | "ExecutionFromModuleSuccess"
      | "ExecutionSuccess"
      | "RemovedOwner"
      | "SignMsg"
  ): EventFragment;

  encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
  encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "addOwnerWithThreshold",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "approvedHashes",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "changeMasterCopy",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "changeThreshold",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "disableModule",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "domainSeparator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "enableModule",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "execTransactionFromModule",
    values: [AddressLike, BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "execTransactionFromModuleReturnData",
    values: [AddressLike, BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getModules",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getModulesPaginated",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getOwners", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getThreshold",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isOwner",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeOwner",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setFallbackHandler",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "signedMessages",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "swapOwner",
    values: [AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setup",
    values: [
      AddressLike[],
      BigNumberish,
      AddressLike,
      BytesLike,
      AddressLike,
      AddressLike,
      BigNumberish,
      AddressLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "execTransaction",
    values: [
      AddressLike,
      BigNumberish,
      BytesLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      AddressLike,
      AddressLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "requiredTxGas",
    values: [AddressLike, BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "approveHash",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "signMessage",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidSignature",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getMessageHash",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeTransactionData",
    values: [
      AddressLike,
      BigNumberish,
      BytesLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      AddressLike,
      AddressLike,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getTransactionHash",
    values: [
      AddressLike,
      BigNumberish,
      BytesLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      AddressLike,
      AddressLike,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(functionFragment: "NAME", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addOwnerWithThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approvedHashes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeMasterCopy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "disableModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "domainSeparator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enableModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "execTransactionFromModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "execTransactionFromModuleReturnData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getModules", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getModulesPaginated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOwners", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFallbackHandler",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "signedMessages",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swapOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setup", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "execTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requiredTxGas",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "signMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMessageHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeTransactionData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTransactionHash",
    data: BytesLike
  ): Result;
}

export namespace AddedOwnerEvent {
  export type InputTuple = [owner: AddressLike];
  export type OutputTuple = [owner: string];
  export interface OutputObject {
    owner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ApproveHashEvent {
  export type InputTuple = [approvedHash: BytesLike, owner: AddressLike];
  export type OutputTuple = [approvedHash: string, owner: string];
  export interface OutputObject {
    approvedHash: string;
    owner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ChangedMasterCopyEvent {
  export type InputTuple = [masterCopy: AddressLike];
  export type OutputTuple = [masterCopy: string];
  export interface OutputObject {
    masterCopy: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ChangedThresholdEvent {
  export type InputTuple = [threshold: BigNumberish];
  export type OutputTuple = [threshold: bigint];
  export interface OutputObject {
    threshold: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DisabledModuleEvent {
  export type InputTuple = [module: AddressLike];
  export type OutputTuple = [module: string];
  export interface OutputObject {
    module: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace EnabledModuleEvent {
  export type InputTuple = [module: AddressLike];
  export type OutputTuple = [module: string];
  export interface OutputObject {
    module: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ExecutionFailureEvent {
  export type InputTuple = [txHash: BytesLike, payment: BigNumberish];
  export type OutputTuple = [txHash: string, payment: bigint];
  export interface OutputObject {
    txHash: string;
    payment: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ExecutionFromModuleFailureEvent {
  export type InputTuple = [module: AddressLike];
  export type OutputTuple = [module: string];
  export interface OutputObject {
    module: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ExecutionFromModuleSuccessEvent {
  export type InputTuple = [module: AddressLike];
  export type OutputTuple = [module: string];
  export interface OutputObject {
    module: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ExecutionSuccessEvent {
  export type InputTuple = [txHash: BytesLike, payment: BigNumberish];
  export type OutputTuple = [txHash: string, payment: bigint];
  export interface OutputObject {
    txHash: string;
    payment: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RemovedOwnerEvent {
  export type InputTuple = [owner: AddressLike];
  export type OutputTuple = [owner: string];
  export interface OutputObject {
    owner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SignMsgEvent {
  export type InputTuple = [msgHash: BytesLike];
  export type OutputTuple = [msgHash: string];
  export interface OutputObject {
    msgHash: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Gnosis_safe extends BaseContract {
  connect(runner?: ContractRunner | null): Gnosis_safe;
  waitForDeployment(): Promise<this>;

  interface: Gnosis_safeInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  NAME: TypedContractMethod<[], [string], "view">;

  VERSION: TypedContractMethod<[], [string], "view">;

  addOwnerWithThreshold: TypedContractMethod<
    [owner: AddressLike, _threshold: BigNumberish],
    [void],
    "nonpayable"
  >;

  approvedHashes: TypedContractMethod<
    [arg0: AddressLike, arg1: BytesLike],
    [bigint],
    "view"
  >;

  changeMasterCopy: TypedContractMethod<
    [_masterCopy: AddressLike],
    [void],
    "nonpayable"
  >;

  changeThreshold: TypedContractMethod<
    [_threshold: BigNumberish],
    [void],
    "nonpayable"
  >;

  disableModule: TypedContractMethod<
    [prevModule: AddressLike, module: AddressLike],
    [void],
    "nonpayable"
  >;

  domainSeparator: TypedContractMethod<[], [string], "view">;

  enableModule: TypedContractMethod<
    [module: AddressLike],
    [void],
    "nonpayable"
  >;

  execTransactionFromModule: TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      operation: BigNumberish
    ],
    [boolean],
    "nonpayable"
  >;

  execTransactionFromModuleReturnData: TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      operation: BigNumberish
    ],
    [[boolean, string] & { success: boolean; returnData: string }],
    "nonpayable"
  >;

  getModules: TypedContractMethod<[], [string[]], "view">;

  getModulesPaginated: TypedContractMethod<
    [start: AddressLike, pageSize: BigNumberish],
    [[string[], string] & { array: string[]; next: string }],
    "view"
  >;

  getOwners: TypedContractMethod<[], [string[]], "view">;

  getThreshold: TypedContractMethod<[], [bigint], "view">;

  isOwner: TypedContractMethod<[owner: AddressLike], [boolean], "view">;

  nonce: TypedContractMethod<[], [bigint], "view">;

  removeOwner: TypedContractMethod<
    [prevOwner: AddressLike, owner: AddressLike, _threshold: BigNumberish],
    [void],
    "nonpayable"
  >;

  setFallbackHandler: TypedContractMethod<
    [handler: AddressLike],
    [void],
    "nonpayable"
  >;

  signedMessages: TypedContractMethod<[arg0: BytesLike], [bigint], "view">;

  swapOwner: TypedContractMethod<
    [prevOwner: AddressLike, oldOwner: AddressLike, newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  setup: TypedContractMethod<
    [
      _owners: AddressLike[],
      _threshold: BigNumberish,
      to: AddressLike,
      data: BytesLike,
      fallbackHandler: AddressLike,
      paymentToken: AddressLike,
      payment: BigNumberish,
      paymentReceiver: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  execTransaction: TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      operation: BigNumberish,
      safeTxGas: BigNumberish,
      baseGas: BigNumberish,
      gasPrice: BigNumberish,
      gasToken: AddressLike,
      refundReceiver: AddressLike,
      signatures: BytesLike
    ],
    [boolean],
    "nonpayable"
  >;

  requiredTxGas: TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      operation: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;

  approveHash: TypedContractMethod<
    [hashToApprove: BytesLike],
    [void],
    "nonpayable"
  >;

  signMessage: TypedContractMethod<[_data: BytesLike], [void], "nonpayable">;

  isValidSignature: TypedContractMethod<
    [_data: BytesLike, _signature: BytesLike],
    [string],
    "nonpayable"
  >;

  getMessageHash: TypedContractMethod<[message: BytesLike], [string], "view">;

  encodeTransactionData: TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      operation: BigNumberish,
      safeTxGas: BigNumberish,
      baseGas: BigNumberish,
      gasPrice: BigNumberish,
      gasToken: AddressLike,
      refundReceiver: AddressLike,
      _nonce: BigNumberish
    ],
    [string],
    "view"
  >;

  getTransactionHash: TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      operation: BigNumberish,
      safeTxGas: BigNumberish,
      baseGas: BigNumberish,
      gasPrice: BigNumberish,
      gasToken: AddressLike,
      refundReceiver: AddressLike,
      _nonce: BigNumberish
    ],
    [string],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "NAME"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "VERSION"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "addOwnerWithThreshold"
  ): TypedContractMethod<
    [owner: AddressLike, _threshold: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "approvedHashes"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BytesLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "changeMasterCopy"
  ): TypedContractMethod<[_masterCopy: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "changeThreshold"
  ): TypedContractMethod<[_threshold: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "disableModule"
  ): TypedContractMethod<
    [prevModule: AddressLike, module: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "domainSeparator"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "enableModule"
  ): TypedContractMethod<[module: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "execTransactionFromModule"
  ): TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      operation: BigNumberish
    ],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "execTransactionFromModuleReturnData"
  ): TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      operation: BigNumberish
    ],
    [[boolean, string] & { success: boolean; returnData: string }],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getModules"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "getModulesPaginated"
  ): TypedContractMethod<
    [start: AddressLike, pageSize: BigNumberish],
    [[string[], string] & { array: string[]; next: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "getOwners"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "getThreshold"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "isOwner"
  ): TypedContractMethod<[owner: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "nonce"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "removeOwner"
  ): TypedContractMethod<
    [prevOwner: AddressLike, owner: AddressLike, _threshold: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setFallbackHandler"
  ): TypedContractMethod<[handler: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "signedMessages"
  ): TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "swapOwner"
  ): TypedContractMethod<
    [prevOwner: AddressLike, oldOwner: AddressLike, newOwner: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setup"
  ): TypedContractMethod<
    [
      _owners: AddressLike[],
      _threshold: BigNumberish,
      to: AddressLike,
      data: BytesLike,
      fallbackHandler: AddressLike,
      paymentToken: AddressLike,
      payment: BigNumberish,
      paymentReceiver: AddressLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "execTransaction"
  ): TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      operation: BigNumberish,
      safeTxGas: BigNumberish,
      baseGas: BigNumberish,
      gasPrice: BigNumberish,
      gasToken: AddressLike,
      refundReceiver: AddressLike,
      signatures: BytesLike
    ],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "requiredTxGas"
  ): TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      operation: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "approveHash"
  ): TypedContractMethod<[hashToApprove: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "signMessage"
  ): TypedContractMethod<[_data: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "isValidSignature"
  ): TypedContractMethod<
    [_data: BytesLike, _signature: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getMessageHash"
  ): TypedContractMethod<[message: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "encodeTransactionData"
  ): TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      operation: BigNumberish,
      safeTxGas: BigNumberish,
      baseGas: BigNumberish,
      gasPrice: BigNumberish,
      gasToken: AddressLike,
      refundReceiver: AddressLike,
      _nonce: BigNumberish
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getTransactionHash"
  ): TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      operation: BigNumberish,
      safeTxGas: BigNumberish,
      baseGas: BigNumberish,
      gasPrice: BigNumberish,
      gasToken: AddressLike,
      refundReceiver: AddressLike,
      _nonce: BigNumberish
    ],
    [string],
    "view"
  >;

  getEvent(
    key: "AddedOwner"
  ): TypedContractEvent<
    AddedOwnerEvent.InputTuple,
    AddedOwnerEvent.OutputTuple,
    AddedOwnerEvent.OutputObject
  >;
  getEvent(
    key: "ApproveHash"
  ): TypedContractEvent<
    ApproveHashEvent.InputTuple,
    ApproveHashEvent.OutputTuple,
    ApproveHashEvent.OutputObject
  >;
  getEvent(
    key: "ChangedMasterCopy"
  ): TypedContractEvent<
    ChangedMasterCopyEvent.InputTuple,
    ChangedMasterCopyEvent.OutputTuple,
    ChangedMasterCopyEvent.OutputObject
  >;
  getEvent(
    key: "ChangedThreshold"
  ): TypedContractEvent<
    ChangedThresholdEvent.InputTuple,
    ChangedThresholdEvent.OutputTuple,
    ChangedThresholdEvent.OutputObject
  >;
  getEvent(
    key: "DisabledModule"
  ): TypedContractEvent<
    DisabledModuleEvent.InputTuple,
    DisabledModuleEvent.OutputTuple,
    DisabledModuleEvent.OutputObject
  >;
  getEvent(
    key: "EnabledModule"
  ): TypedContractEvent<
    EnabledModuleEvent.InputTuple,
    EnabledModuleEvent.OutputTuple,
    EnabledModuleEvent.OutputObject
  >;
  getEvent(
    key: "ExecutionFailure"
  ): TypedContractEvent<
    ExecutionFailureEvent.InputTuple,
    ExecutionFailureEvent.OutputTuple,
    ExecutionFailureEvent.OutputObject
  >;
  getEvent(
    key: "ExecutionFromModuleFailure"
  ): TypedContractEvent<
    ExecutionFromModuleFailureEvent.InputTuple,
    ExecutionFromModuleFailureEvent.OutputTuple,
    ExecutionFromModuleFailureEvent.OutputObject
  >;
  getEvent(
    key: "ExecutionFromModuleSuccess"
  ): TypedContractEvent<
    ExecutionFromModuleSuccessEvent.InputTuple,
    ExecutionFromModuleSuccessEvent.OutputTuple,
    ExecutionFromModuleSuccessEvent.OutputObject
  >;
  getEvent(
    key: "ExecutionSuccess"
  ): TypedContractEvent<
    ExecutionSuccessEvent.InputTuple,
    ExecutionSuccessEvent.OutputTuple,
    ExecutionSuccessEvent.OutputObject
  >;
  getEvent(
    key: "RemovedOwner"
  ): TypedContractEvent<
    RemovedOwnerEvent.InputTuple,
    RemovedOwnerEvent.OutputTuple,
    RemovedOwnerEvent.OutputObject
  >;
  getEvent(
    key: "SignMsg"
  ): TypedContractEvent<
    SignMsgEvent.InputTuple,
    SignMsgEvent.OutputTuple,
    SignMsgEvent.OutputObject
  >;

  filters: {
    "AddedOwner(address)": TypedContractEvent<
      AddedOwnerEvent.InputTuple,
      AddedOwnerEvent.OutputTuple,
      AddedOwnerEvent.OutputObject
    >;
    AddedOwner: TypedContractEvent<
      AddedOwnerEvent.InputTuple,
      AddedOwnerEvent.OutputTuple,
      AddedOwnerEvent.OutputObject
    >;

    "ApproveHash(bytes32,address)": TypedContractEvent<
      ApproveHashEvent.InputTuple,
      ApproveHashEvent.OutputTuple,
      ApproveHashEvent.OutputObject
    >;
    ApproveHash: TypedContractEvent<
      ApproveHashEvent.InputTuple,
      ApproveHashEvent.OutputTuple,
      ApproveHashEvent.OutputObject
    >;

    "ChangedMasterCopy(address)": TypedContractEvent<
      ChangedMasterCopyEvent.InputTuple,
      ChangedMasterCopyEvent.OutputTuple,
      ChangedMasterCopyEvent.OutputObject
    >;
    ChangedMasterCopy: TypedContractEvent<
      ChangedMasterCopyEvent.InputTuple,
      ChangedMasterCopyEvent.OutputTuple,
      ChangedMasterCopyEvent.OutputObject
    >;

    "ChangedThreshold(uint256)": TypedContractEvent<
      ChangedThresholdEvent.InputTuple,
      ChangedThresholdEvent.OutputTuple,
      ChangedThresholdEvent.OutputObject
    >;
    ChangedThreshold: TypedContractEvent<
      ChangedThresholdEvent.InputTuple,
      ChangedThresholdEvent.OutputTuple,
      ChangedThresholdEvent.OutputObject
    >;

    "DisabledModule(address)": TypedContractEvent<
      DisabledModuleEvent.InputTuple,
      DisabledModuleEvent.OutputTuple,
      DisabledModuleEvent.OutputObject
    >;
    DisabledModule: TypedContractEvent<
      DisabledModuleEvent.InputTuple,
      DisabledModuleEvent.OutputTuple,
      DisabledModuleEvent.OutputObject
    >;

    "EnabledModule(address)": TypedContractEvent<
      EnabledModuleEvent.InputTuple,
      EnabledModuleEvent.OutputTuple,
      EnabledModuleEvent.OutputObject
    >;
    EnabledModule: TypedContractEvent<
      EnabledModuleEvent.InputTuple,
      EnabledModuleEvent.OutputTuple,
      EnabledModuleEvent.OutputObject
    >;

    "ExecutionFailure(bytes32,uint256)": TypedContractEvent<
      ExecutionFailureEvent.InputTuple,
      ExecutionFailureEvent.OutputTuple,
      ExecutionFailureEvent.OutputObject
    >;
    ExecutionFailure: TypedContractEvent<
      ExecutionFailureEvent.InputTuple,
      ExecutionFailureEvent.OutputTuple,
      ExecutionFailureEvent.OutputObject
    >;

    "ExecutionFromModuleFailure(address)": TypedContractEvent<
      ExecutionFromModuleFailureEvent.InputTuple,
      ExecutionFromModuleFailureEvent.OutputTuple,
      ExecutionFromModuleFailureEvent.OutputObject
    >;
    ExecutionFromModuleFailure: TypedContractEvent<
      ExecutionFromModuleFailureEvent.InputTuple,
      ExecutionFromModuleFailureEvent.OutputTuple,
      ExecutionFromModuleFailureEvent.OutputObject
    >;

    "ExecutionFromModuleSuccess(address)": TypedContractEvent<
      ExecutionFromModuleSuccessEvent.InputTuple,
      ExecutionFromModuleSuccessEvent.OutputTuple,
      ExecutionFromModuleSuccessEvent.OutputObject
    >;
    ExecutionFromModuleSuccess: TypedContractEvent<
      ExecutionFromModuleSuccessEvent.InputTuple,
      ExecutionFromModuleSuccessEvent.OutputTuple,
      ExecutionFromModuleSuccessEvent.OutputObject
    >;

    "ExecutionSuccess(bytes32,uint256)": TypedContractEvent<
      ExecutionSuccessEvent.InputTuple,
      ExecutionSuccessEvent.OutputTuple,
      ExecutionSuccessEvent.OutputObject
    >;
    ExecutionSuccess: TypedContractEvent<
      ExecutionSuccessEvent.InputTuple,
      ExecutionSuccessEvent.OutputTuple,
      ExecutionSuccessEvent.OutputObject
    >;

    "RemovedOwner(address)": TypedContractEvent<
      RemovedOwnerEvent.InputTuple,
      RemovedOwnerEvent.OutputTuple,
      RemovedOwnerEvent.OutputObject
    >;
    RemovedOwner: TypedContractEvent<
      RemovedOwnerEvent.InputTuple,
      RemovedOwnerEvent.OutputTuple,
      RemovedOwnerEvent.OutputObject
    >;

    "SignMsg(bytes32)": TypedContractEvent<
      SignMsgEvent.InputTuple,
      SignMsgEvent.OutputTuple,
      SignMsgEvent.OutputObject
    >;
    SignMsg: TypedContractEvent<
      SignMsgEvent.InputTuple,
      SignMsgEvent.OutputTuple,
      SignMsgEvent.OutputObject
    >;
  };
}