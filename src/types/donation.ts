import { Campaign } from "./campaign";
import { User } from "./user";

export interface Donation {
  id: number;
  created_at: string;
  amount: number;
  status: string;
  user: DonationDetail;
  tip: number;
  campaign: Campaign;
}

export interface DonationDetail {
  name: string;
  email: string;
  user_id: string;
  is_anonym: boolean;
}

export interface Payment {
  donation_id: number;
  status: string;
  external_id: string;
  payment_id: string;
  payment_method_type: string;
  bank_code: string;
  account_number: number;
  retail_outlet_name: string;
  payment_code: string;
}
