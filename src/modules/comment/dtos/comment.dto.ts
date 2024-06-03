import { IsString } from 'class-validator';

export class CommentBillDto {
  @IsString()
  session: string;
  @IsString()
  comment: string;
  @IsString()
  user_id: string;
  @IsString()
  post_id: string;
  @IsString()
  nickname: string;
  @IsString()
  createdTime: string;
}
