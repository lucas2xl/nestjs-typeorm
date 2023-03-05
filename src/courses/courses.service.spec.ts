import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
function createMockRepository<T = any>(): MockRepository<T> {
  return {
    findOne: jest.fn(),
  };
}

describe('CoursesService', () => {
  let service: CoursesService;
  let courseRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Course),
          useValue: createMockRepository(),
        },
        { provide: getRepositoryToken(Tag), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    courseRepository = module.get<MockRepository>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('Should create a course');

  describe('Find course by id', () => {
    it('should be return one course', async () => {
      const courseId = '1';
      const expectCourse = {};

      courseRepository.findOne.mockReturnValue(expectCourse);

      const course = await service.show(courseId);
      expect(course).toEqual(expectCourse);
    });

    it('should be return notFoundException', async () => {
      const courseId = '1';

      courseRepository.findOne.mockReturnValue(undefined);

      try {
        await service.show(courseId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
