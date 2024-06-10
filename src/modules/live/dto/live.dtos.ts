import { IsString } from 'class-validator';

export class LiveSessionStartDto {
  @IsString()
  idLiveUser: string;
  @IsString()
  userId: string;
}

export class LiveSessionEndDto {
  @IsString()
  idLiveUser: string;
  @IsString()
  userId: string;
  @IsString()
  endTime: string;
}
