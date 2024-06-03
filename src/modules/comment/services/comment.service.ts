import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommentBillDto } from '../dtos/comment.dto';
import { ApiResponse } from 'src/common/types';
import { CommentResponse } from '../interface/comment.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommenBillDocument, CommentBill } from '../models/commentBill.model';
// import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentBill.name)
    private commentBillModel: Model<CommenBillDocument>,
  ) {}

  async saveBill(
    commentBillData: CommentBillDto,
  ): Promise<ApiResponse<CommentResponse>> {
    try {
      const { session, comment, user_id, post_id, nickname, createdTime } =
        commentBillData;

      // Find the document first
      let savedBillComment = await this.commentBillModel
        .findOne({ session, post_id })
        .exec();

      // If the document exists, update it
      if (savedBillComment) {
        const nextCommentCount = savedBillComment.printCount + 1;
        savedBillComment.comment +=
          ', comment: ' + nextCommentCount + ' ' + comment;
        savedBillComment.printCount += 1;
        await savedBillComment.save();
      } else {
        const billComment = new this.commentBillModel({
          session,
          comment: 'comment 1: ' + comment,
          user_id,
          post_id,
          nickname,
          createdTime,
        });
        savedBillComment = await billComment.save();
      }
      return {
        data: {
          message: 'Bill save success',
          comment: savedBillComment,
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while saving the bill');
    }
  }

  async findAll(session: string) {
    const bill = await this.commentBillModel.find({ session }).exec();

    if (bill.length === 0) {
      throw new HttpException(
        `This live session don't have any order`,
        HttpStatus.NOT_FOUND,
      );
    }

    const totalOrder = bill.reduce((acc, cur) => acc + cur.printCount, 0);
    return {
      message: 'Get all order success',
      result: totalOrder as any,
    };
  }
}
