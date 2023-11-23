import { Transform } from 'class-transformer';

import {
    IsInt,
    IsNotEmpty,
    IsString,
    Length,
  } from 'class-validator';
  
  export class UpdateOrderDTO {
    @IsNotEmpty()
    @IsString()
    productId: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    client: string;
  
    @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
    address: string;
  }