import { BadRequestException, Injectable } from '@nestjs/common';
import { ForReadingFiles } from '../../ports/drivens';

@Injectable()
export class FilesReaderAdapter implements ForReadingFiles {
  async readFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('The file is required');
    }
    const fileContent = file.buffer.toString();
    return fileContent;
  }
}
