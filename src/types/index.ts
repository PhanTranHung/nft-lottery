export declare type Falsy = false | 0 | '' | null | undefined;

export interface IQueryResult {
  status?: string | undefined;
  total?: number | undefined;
  page?: number | undefined;
  page_size?: number | undefined;
  result?: INFTData[];
}
export interface INFTData {
  token_address: string;
  token_id: string;
  contract_type: string;
  token_uri?: string | undefined;
  metadata?: string | undefined;
  metadata_parsed?: INFTMetadata;
  synced_at?: string | undefined;
  amount?: string | undefined;
  name: string;
  symbol: string;
  owner_of?: string;
  block_number?: string;
  block_number_minted?: string;
}

export interface INFTMetadata {
  name?: string;
  description?: string;
  image?: string;
  external_url?: string;
  background_color?: string;
  [key: string]: any;
}
