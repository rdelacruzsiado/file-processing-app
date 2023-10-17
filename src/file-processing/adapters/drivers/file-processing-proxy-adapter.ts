import { Injectable } from '@nestjs/common';
import { FileProcessingService } from '../../app/file-processing.service';
import { ForProcessingFiles } from '../../ports/drivers';
import { WordCountResult, WordExistenceResult } from '../../app/models';

@Injectable()
export class FileProcessingProxyAdapter implements ForProcessingFiles {
  constructor(private readonly fileProcessingService: FileProcessingService) {}

  async countWordsInFile(file: Express.Multer.File): Promise<WordCountResult> {
    return this.fileProcessingService.countWordsInFile(file);
  }

  async findWordInFile(
    word: string,
    file: Express.Multer.File,
  ): Promise<WordExistenceResult> {
    return this.fileProcessingService.findWordInFile(word, file);
  }
}
