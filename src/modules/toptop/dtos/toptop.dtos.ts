import { IsString } from 'class-validator';

export class ToptopDto {
  @IsString()
  idUserLive: string;
}
export class StopLiveDto {
  @IsString()
  idUserLive: string;
  @IsString()
  sessionId: string;
}
