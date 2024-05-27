import { Controller, Post, Body } from '@nestjs/common';
import { CommentDto } from '../dtos/comment.dto';
import { GetCommentResponse } from '../interface/comment.interface';
import { ApiResponse } from 'src/common/types';
import { CommentService } from '../services/comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('save')
  create(
    @Body() commentData: CommentDto,
  ): Promise<ApiResponse<GetCommentResponse>> {
    return this.commentService.create(commentData);
  }

  // @Get()
  // findAll() {
  //   return this.CommentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') idUserLive: string) {
  //   return this.CommentService.findOne(idUserLive);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.saveCommentService.remove(+id);
  // }
}
