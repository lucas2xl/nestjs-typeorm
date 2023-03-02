import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { StoreCourseDto } from './dto/store-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async index(): Promise<Course[]> {
    return this.coursesService.index();
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Course> {
    return this.coursesService.show(id);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async store(@Body() body: StoreCourseDto): Promise<void> {
    return this.coursesService.store(body);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCourseDto,
  ): Promise<void> {
    await this.coursesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string): Promise<void> {
    await this.coursesService.destroy(id);
  }
}
