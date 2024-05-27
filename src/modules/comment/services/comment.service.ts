import { Injectable } from '@nestjs/common';
import { CommentDto } from '../dtos/comment.dto';
import { ApiResponse } from 'src/common/types';
import { GetCommentResponse } from '../interface/comment.interface';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../models/comment.models';
import { InjectModel } from '@nestjs/mongoose';
// import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>,
  ) {}

  async create({
    comment,
    // user_id,
    post_id,
    nickname,
  }: CommentDto): Promise<ApiResponse<GetCommentResponse>> {
    // const { comment, user_id, post_id, nickname } = CommentDto;

    const createdComment = new this.commentModel({
      comment,
      // user_id,
      post_id,
      nickname,
    });
    const savedComment = await createdComment.save();

    return {
      data: {
        message: 'comment save success',
        comment: savedComment,
      },
    };
  }

  findOne(idUserLive: string) {
    return `This action returns a #${idUserLive} saveComment`;
  }
  // findAll() {
  //   return `This action returns all saveComment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} saveComment`;
  // }
}
