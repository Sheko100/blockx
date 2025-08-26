export const idlFactory = ({ IDL }) => {
  const AssetType = IDL.Variant({
    'Physical' : IDL.Null,
    'NonPhysical' : IDL.Null,
  });
  const AssetDetails = IDL.Record({
    'files' : IDL.Vec(IDL.Text),
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
    'deed_document' : IDL.Vec(IDL.Text),
    'deed_reference_number' : IDL.Opt(IDL.Text),
    'publication_links' : IDL.Vec(IDL.Text),
    'registration_number' : IDL.Opt(IDL.Text),
    'license_plate' : IDL.Opt(IDL.Text),
    'serial_number' : IDL.Opt(IDL.Text),
  });
  const Asset = IDL.Record({
    'asset_type' : AssetType,
    'owner' : IDL.Principal,
    'hash' : IDL.Text,
    'created_at' : IDL.Nat,
    'details' : AssetDetails,
    'category' : AssetCategory,
    'ownership_proof' : Proof,
  });
  const User = IDL.Record({
    'username' : IDL.Text,
    'password' : IDL.Text,
    'email' : IDL.Text,
  });
  const AssetUserInput = IDL.Record({
    'asset_type' : AssetType,
    'details' : AssetDetails,
    'category' : AssetCategory,
    'ownership_proof' : Proof,
  });
  const ServiceError = IDL.Variant({
    'InvalidCategory' : IDL.Text,
    'NotFound' : IDL.Text,
    'AssetAlreadyExists' : IDL.Text,
    'Unauthorized' : IDL.Text,
    'MissingProof' : IDL.Text,
    'InternalError' : IDL.Text,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : ServiceError });
  return IDL.Service({
    'add_user' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'get_assets' : IDL.Func([IDL.Vec(IDL.Nat)], [IDL.Vec(Asset)], ['query']),
    'get_user' : IDL.Func([IDL.Nat], [User], ['query']),
    'get_user_assets' : IDL.Func([], [IDL.Vec(Asset)], ['query']),
    'register_asset' : IDL.Func([AssetUserInput], [Result], []),
    'verify_asset' : IDL.Func([IDL.Text, AssetCategory], [IDL.Bool], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
