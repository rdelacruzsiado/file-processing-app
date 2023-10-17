import { Injectable } from '@nestjs/common';

import { ForReadingFiles } from '../ports/drivens';
import { ForProcessingFiles } from '../ports/drivers';
import { WordCountResult, WordExistenceResult } from './models';

@Injectable()
export class FileProcessingService implements ForProcessingFiles {
  constructor(private readonly forReadingFiles: ForReadingFiles) {}

  async countWordsInFile(file: Express.Multer.File): Promise<WordCountResult> {
    const fileContent = await this.forReadingFiles.readFile(file);
    const words = fileContent
      .replace(/\W/g, ' ')
      .trim()
      .split(/\s+/)
      .filter((word) => word !== '');

    const numberOfWords = words.length;

    return { numberOfWords };
  }

  async findWordInFile(
    word: string,
    file: Express.Multer.File,
  ): Promise<WordExistenceResult> {
    const fileContent = await this.forReadingFiles.readFile(file);
    const found = fileContent.toLowerCase().includes(word.toLowerCase());

    return { found };
  }
}
