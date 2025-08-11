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
    'extra_metadata' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'description' : IDL.Text,
    'jurisdiction' : IDL.Opt(IDL.Text),
    'serial_or_id' : IDL.Opt(IDL.Text),
  });
  const AssetCategory = IDL.Variant({
    'IntellectualProperty' : IDL.Null,
    'RealEstate' : IDL.Null,
    'Vehicle' : IDL.Null,
    'ValuableItem' : IDL.Null,
    'DigitalAsset' : IDL.Null,
    'Equipment' : IDL.Null,
    'ContractualRights' : IDL.Null,
  });
  const Proof = IDL.Record({
    'document_url' : IDL.Opt(IDL.Text),
    'witness' : IDL.Opt(IDL.Text),
    'acquisition_date' : IDL.Opt(IDL.Nat64),
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
