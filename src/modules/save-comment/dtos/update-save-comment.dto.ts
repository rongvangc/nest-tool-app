import { PartialType } from '@nestjs/mapped-types';
import { CreateSaveCommentDto } from './create-save-comment.dto';

export class UpdateSaveCommentDto extends PartialType(CreateSaveCommentDto) {}
