import { IsString } from 'class-validator';
export class CreateSaveCommentDto {
  @IsString()
  comment: string;
  @IsString()
  user_id: string;
  @IsString()
  post_id: string;
  @IsString()
  nickname;
  // @IsTimeZone()
  // createdTime: string;
}
