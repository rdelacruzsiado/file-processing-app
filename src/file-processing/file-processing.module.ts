import { Module } from '@nestjs/common';
import {
  FileProcessingController,
  FileProcessingProxyAdapter,
} from './adapters/drivers';
import { FileProcessingService } from './app/file-processing.service';
import { ForProcessingFiles } from './ports/drivers';
import { ForReadingFiles } from './ports/drivens';
import { FilesReaderAdapter } from './adapters/drivens';

@Module({
  providers: [
    FileProcessingService,
    { provide: ForProcessingFiles, useClass: FileProcessingProxyAdapter },
    { provide: ForReadingFiles, useClass: FilesReaderAdapter },
  ],
  controllers: [FileProcessingController],
})
export class FileProcessingModule {}
