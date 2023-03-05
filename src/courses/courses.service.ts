import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreCourseDto } from './dto/store-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async index(): Promise<Course[]> {
    return this.courseRepository.find({
      relations: ['tags'],
    });
  }

  async show(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!course) {
      throw new NotFoundException();
    }
    return course;
  }

  async store(course: StoreCourseDto): Promise<Course> {
    const tags = await Promise.all(
      course.tags.map((name) => this.preloadTagByName(name)),
    );
    const courseCreated = this.courseRepository.create({ ...course, tags });
    return this.courseRepository.save(courseCreated);
  }

  async update(id: string, updateCourse: UpdateCourseDto): Promise<void> {
    const tags = await Promise.all(
      updateCourse.tags?.map((name) => this.preloadTagByName(name)),
    );
    const course = await this.courseRepository.preload({
      id,
      ...updateCourse,
      tags,
    });

    if (!course) {
      throw new NotFoundException();
    }

    await this.courseRepository.save(course);
  }

  async destroy(id: string): Promise<void> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException();
    }

    await this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string) {
    const tag = await this.tagRepository.findOne({ where: { name } });
    if (tag) return tag;

    return this.tagRepository.create({ name });
  }
}
