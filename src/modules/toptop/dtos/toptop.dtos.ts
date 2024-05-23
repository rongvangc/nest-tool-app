import { IsString } from 'class-validator';

export class ToptopDto {
  @IsString()
  idLiveUser: string;
}
