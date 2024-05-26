import { Injectable } from '@nestjs/common';
import { CreateSaveCommentDto } from '../dtos/create-save-comment.dto';
import { ApiResponse } from 'src/common/types';
import { GetCommentResponse } from '../interface/save-comment.interface';
import { Model } from 'mongoose';
import {
  SaveComment,
  SaveCommentDocument,
} from '../models/save-comment.models';
import { InjectModel } from '@nestjs/mongoose';
// import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SaveCommentService {
  constructor(
    @InjectModel(SaveComment.name)
    private commentModel: Model<SaveCommentDocument>,
  ) {}

  async create({
    comment,
    user_id,
    post_id,
    nickname,
  }: CreateSaveCommentDto): Promise<ApiResponse<GetCommentResponse>> {
    // const { comment, user_id, post_id, nickname } = createSaveCommentDto;

    const createdComment = new this.commentModel({
      comment,
      user_id,
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

  // findAll() {
  //   return `This action returns all saveComment`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} saveComment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} saveComment`;
  // }
}
