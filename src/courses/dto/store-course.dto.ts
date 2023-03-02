import { IsNotEmpty, IsString } from 'class-validator';

export class StoreCourseDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsString({ each: true })
  readonly tags: string[];
}
