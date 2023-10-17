import { Test } from '@nestjs/testing';

import { FileProcessingService } from './file-processing.service';
import { ForReadingFiles } from '../ports/drivens';

describe('FileProcessingService', () => {
  let fileProcessingService: FileProcessingService;
  let mockForReadingFiles: ForReadingFiles;

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
      const filePath = 'test.txt';
      const fileContent = 'This is a test file.';

      jest
        .spyOn(mockForReadingFiles, 'readFile')
        .mockResolvedValue(fileContent);

      const result = await fileProcessingService.countWordsInFile(filePath);

      expect(result).toBe(5);
    });

    it('avoid to count punctuation marks', async () => {
      const filePath = 'test.txt';
      const fileContent = 'This is a test file. @ . ! ?';

      jest
        .spyOn(mockForReadingFiles, 'readFile')
        .mockResolvedValue(fileContent);

      const result = await fileProcessingService.countWordsInFile(filePath);

      expect(result).toBe(5);
    });

    it('File void should return 0', async () => {
      const filePath = 'test.txt';
      const fileContent = '';

      jest
        .spyOn(mockForReadingFiles, 'readFile')
        .mockResolvedValue(fileContent);

      const result = await fileProcessingService.countWordsInFile(filePath);

      expect(result).toBe(0);
    });
  });

  describe('findWordInFile', () => {
    it('should find a word in a file', async () => {
      const filePath = 'test.txt';
      const wordToFind = 'test';
      const fileContent = 'This is a test file.';

      jest
        .spyOn(mockForReadingFiles, 'readFile')
        .mockResolvedValue(fileContent);

      const result = await fileProcessingService.findWordInFile(
        wordToFind,
        filePath,
      );

      expect(result).toBe(true);
    });

    it('find a word even with capital or lowercase', async () => {
      const filePath = 'test.txt';
      const wordToFind = 'Test';
      const fileContent = 'This is a teSt file.';

      jest
        .spyOn(mockForReadingFiles, 'readFile')
        .mockResolvedValue(fileContent);

      const result = await fileProcessingService.findWordInFile(
        wordToFind,
        filePath,
      );

      expect(result).toBe(true);
    });

    it('should not find a word in a file', async () => {
      const filePath = 'test.txt';
      const wordToFind = 'example';
      const fileContent = 'This is a test file.';

      jest
        .spyOn(mockForReadingFiles, 'readFile')
        .mockResolvedValue(fileContent);

      const result = await fileProcessingService.findWordInFile(
        wordToFind,
        filePath,
      );

      expect(result).toBe(false);
    });
  });
});
