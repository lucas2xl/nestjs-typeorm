import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { databaseOptions } from './database/database';

@Module({
  imports: [TypeOrmModule.forRoot(databaseOptions), CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
