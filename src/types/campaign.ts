import { Donation } from "./donation";
import { User } from "./user";

export interface Campaign {
  id: number;
  title: string;
  slug: string;
  story: string;
  goal_amount: number;
  current_amount: number;
  organizer: Partial<User>;
  thumbnail: string;
  created_at: Date;
  end_date: Date;
  category_id: number;
  donation: Donation[];
}
