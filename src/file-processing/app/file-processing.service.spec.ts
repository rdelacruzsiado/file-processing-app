import { Test } from '@nestjs/testing';
import { Readable } from 'stream';

import { FileProcessingService } from './file-processing.service';
import { ForReadingFiles } from '../ports/drivens';

describe('FileProcessingService', () => {
  let fileProcessingService: FileProcessingService;
  let mockForReadingFiles: ForReadingFiles;

  const mockFile: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'example.txt',
    encoding: '7bit',
    mimetype: 'text/plain',
    destination: '/tmp',
    filename: 'example.txt',
    path: '/tmp/example.txt',
    size: 1024,
    buffer: Buffer.from('Contenido de ejemplo'),
    stream: new Readable(),
  };

  beforeEach(async () => {
    mockForReadingFiles = {
      readFile: jest.fn(),
    };
    const moduleRef = await Test.createTestingModule({
      providers: [
        FileProcessingService,
        { provide: ForReadingFiles, useValue: mockForReadingFiles },
      ],
    }).compile();

    fileProcessingService = moduleRef.get<FileProcessingService>(
      FileProcessingService,
    );
    mockForReadingFiles = moduleRef.get<ForReadingFiles>(ForReadingFiles);
  });

  describe('countWordsInFile', () => {
    it('should count words in a file', async () => {
      const fileContent = 'This is a test file.';

      jest
        .spyOn(mockForReadingFiles, 'readFile')
        .mockResolvedValue(fileContent);

      const result = await fileProcessingService.countWordsInFile(mockFile);

      expect(result.numberOfWords).toBe(5);
    });

    it('avoid to count punctuation marks', async () => {
      const fileContent = 'This is a test file. @ . ! ?';

      jest
        .spyOn(mockForReadingFiles, 'readFile')
        .mockResolvedValue(fileContent);

      const result = await fileProcessingService.countWordsInFile(mockFile);

      expect(result.numberOfWords).toBe(5);
    });

    it('File void should return 0', async () => {
      const fileContent = '';

      jest
        .spyOn(mockForReadingFiles, 'readFile')
        .mockResolvedValue(fileContent);

      const result = await fileProcessingService.countWordsInFile(mockFile);

      expect(result.numberOfWords).toBe(0);
    });
  });

  describe('findWordInFile', () => {
    it('should find a word in a file', async () => {
      const wordToFind = 'test';
      const fileContent = 'This is a test file.';

      jest
        .spyOn(mockForReadingFiles, 'readFile')
        .mockResolvedValue(fileContent);

      const result = await fileProcessingService.findWordInFile(
        wordToFind,
        mockFile,
      );

      expect(result.found).toBe(true);
    });

    it('find a word even with capital or lowercase', async () => {
      const wordToFind = 'Test';
      const fileContent = 'This is a teSt file.';

      jest
        .spyOn(mockForReadingFiles, 'readFile')
        .mockResolvedValue(fileContent);

      const result = await fileProcessingService.findWordInFile(
        wordToFind,
        mockFile,
      );

      expect(result.found).toBe(true);
    });

    it('should not find a word in a file', async () => {
      const wordToFind = 'example';
      const fileContent = 'This is a test file.';

      jest
        .spyOn(mockForReadingFiles, 'readFile')
        .mockResolvedValue(fileContent);

      const result = await fileProcessingService.findWordInFile(
        wordToFind,
        mockFile,
      );

      expect(result.found).toBe(false);
    });
  });
});
