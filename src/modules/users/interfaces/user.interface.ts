import { User as ClerkUser } from '@clerk/clerk-sdk-node';
import { GeneralStatus } from 'src/common/types';

export type GetUserResponse = ClerkUser & {
  tiktokLiveID: string;
  clerkUserId: string;
};

export type UpdateTiktokIDResponse = {
  status: GeneralStatus;
};
