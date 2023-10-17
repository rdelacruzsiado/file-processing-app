import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ForProcessingFiles } from '../../ports/drivers';
import { FileUploadDto, FindWordDto } from '../../app/dtos';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('File')
@Controller('file')
export class FileProcessingController {
  constructor(private readonly forProcessingFiles: ForProcessingFiles) {}

  @Post('count-words')
  @ApiOperation({ summary: 'Count words in a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Select a file to count words in',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  countWordsInFile(@UploadedFile() file: Express.Multer.File) {
    return this.forProcessingFiles.countWordsInFile(file);
  }

  @Post('find-word')
  @ApiOperation({ summary: 'Find a word in a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Select a file to count words in',
    type: FindWordDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  findWordInFile(
    @Body() { word }: FindWordDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.forProcessingFiles.findWordInFile(word, file);
  }
}
