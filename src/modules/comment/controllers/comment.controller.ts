import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommentBillDto } from '../dtos/comment.dto';
import { CommentResponse } from '../interface/comment.interface';
import { ApiResponse } from 'src/common/types';
import { CommentService } from '../services/comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('saveBill')
  saveBill(
    @Body() commentBillData: CommentBillDto,
  ): Promise<ApiResponse<CommentResponse>> {
    return this.commentService.saveBill(commentBillData);
  }

  @Get(':sessionId')
  findAllOrderInSession(@Param('sessionId') sessionId: string) {
    return this.commentService.findOrderInOneSession(sessionId);
  }
}
