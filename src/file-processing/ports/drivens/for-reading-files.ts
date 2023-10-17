export abstract class ForReadingFiles {
  abstract readFile(file: Express.Multer.File): Promise<string>;
}
