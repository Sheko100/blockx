export const idlFactory = ({ IDL }) => {
  const EncryptedNote = IDL.Record({
    'id' : IDL.Nat,
    'encrypted_text' : IDL.Text,
    'owner' : IDL.Text,
    'users' : IDL.Vec(IDL.Text),
  });
  const anon_class_15_1 = IDL.Service({
    'add_user' : IDL.Func([IDL.Nat, IDL.Text], [], []),
    'create_note' : IDL.Func([], [IDL.Nat], []),
    'delete_note' : IDL.Func([IDL.Nat], [], []),
    'encrypted_symmetric_key_for_note' : IDL.Func(
        [IDL.Nat, IDL.Vec(IDL.Nat8)],
        [IDL.Text],
        [],
      ),
    'get_notes' : IDL.Func([], [IDL.Vec(EncryptedNote)], []),
    'remove_user' : IDL.Func([IDL.Nat, IDL.Text], [], []),
    'symmetric_key_verification_key_for_note' : IDL.Func([], [IDL.Text], []),
    'update_note' : IDL.Func([IDL.Nat, IDL.Text], [], []),
    'whoami' : IDL.Func([], [IDL.Text], []),
  });
  return anon_class_15_1;
};
export const init = ({ IDL }) => { return []; };
