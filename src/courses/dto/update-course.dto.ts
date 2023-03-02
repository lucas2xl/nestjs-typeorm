import { PartialType } from '@nestjs/mapped-types';
import { StoreCourseDto } from './store-course.dto';

export class UpdateCourseDto extends PartialType(StoreCourseDto) {}
