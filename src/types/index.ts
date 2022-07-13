export declare type Falsy = false | 0 | '' | null | undefined;

export interface INFTMetadata {
  token_address: string;
  token_id: string;
  contract_type: string;
  token_uri?: string | undefined;
  metadata?: string | undefined;
  metadata_parsed?: {
    name?: string;
    description?: string;
    image?: string;
    external_url?: string;
    background_color?: string;
  };
  synced_at?: string | undefined;
  amount?: string | undefined;
  name: string;
  symbol: string;
}
