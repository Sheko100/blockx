import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface EncryptedNote {
  'id' : bigint,
  'encrypted_text' : string,
  'owner' : string,
  'users' : Array<string>,
}
export interface anon_class_15_1 {
  'add_user' : ActorMethod<[bigint, string], undefined>,
  'create_note' : ActorMethod<[], bigint>,
  'delete_note' : ActorMethod<[bigint], undefined>,
  'encrypted_symmetric_key_for_note' : ActorMethod<
    [bigint, Uint8Array | number[]],
    string
  >,
  'get_notes' : ActorMethod<[], Array<EncryptedNote>>,
  'remove_user' : ActorMethod<[bigint, string], undefined>,
  'symmetric_key_verification_key_for_note' : ActorMethod<[], string>,
  'update_note' : ActorMethod<[bigint, string], undefined>,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends anon_class_15_1 {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
