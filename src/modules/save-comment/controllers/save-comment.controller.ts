import { Controller, Post, Body } from '@nestjs/common';
import { SaveCommentService } from '../services/save-comment.service';
import { CreateSaveCommentDto } from '../dtos/create-save-comment.dto';
import { GetCommentResponse } from '../interface/save-comment.interface';
import { ApiResponse } from 'src/common/types';

@Controller('save-comment')
export class SaveCommentController {
  constructor(private readonly saveCommentService: SaveCommentService) {}

  @Post('create')
  create(
    @Body() createSaveCommentDto: CreateSaveCommentDto,
  ): Promise<ApiResponse<GetCommentResponse>> {
    return this.saveCommentService.create(createSaveCommentDto);
  }

  // @Get()
  // findAll() {
  //   return this.saveCommentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.saveCommentService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.saveCommentService.remove(+id);
  // }
}
