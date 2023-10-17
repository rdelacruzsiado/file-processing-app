import { WordCountResult, WordExistenceResult } from '../../app/models';

export abstract class ForProcessingFiles {
  abstract countWordsInFile(
    file: Express.Multer.File,
  ): Promise<WordCountResult>;
  abstract findWordInFile(
    word: string,
    file: Express.Multer.File,
  ): Promise<WordExistenceResult>;
}
