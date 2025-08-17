export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({
    'username' : IDL.Text,
    'password' : IDL.Text,
    'email' : IDL.Text,
  });
  const AssetType = IDL.Variant({
    'Physical' : IDL.Null,
    'NonPhysical' : IDL.Null,
  });
  const AssetDetails = IDL.Record({
    'files' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'manufacturer' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'type' : IDL.Opt(IDL.Text),
    'description' : IDL.Text,
    'address' : IDL.Opt(IDL.Text),
  });
  const AssetCategory = IDL.Variant({
    'IntellectualProperty' : IDL.Null,
    'RealEstate' : IDL.Null,
    'Vehicle' : IDL.Null,
    'ValuableItem' : IDL.Null,
    'DigitalAsset' : IDL.Null,
    'Equipment' : IDL.Null,
  });
  const Proof = IDL.Record({
    'deed_document' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'deed_reference_number' : IDL.Opt(IDL.Text),
    'publication_links' : IDL.Opt(IDL.Text),
    'license_plate' : IDL.Opt(IDL.Text),
    'serial_number' : IDL.Opt(IDL.Text),
    'registeration_number' : IDL.Opt(IDL.Text),
  });
  const AssetUserInput = IDL.Record({
    'asset_type' : AssetType,
    'details' : AssetDetails,
    'category' : AssetCategory,
    'ownership_proof' : Proof,
  });
  return IDL.Service({
    'add_user' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'get_user' : IDL.Func([IDL.Nat], [User], ['query']),
    'register_asset' : IDL.Func([AssetUserInput], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
