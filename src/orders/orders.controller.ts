import { Controller, Param, Get, ParseUUIDPipe, NotFoundException, Delete, Post, Body, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {};

    @Get('/')
    getAll(): any {
      return this.ordersService.getAll();
    };

    @Get('/:id')
    public getById(@Param('id', new ParseUUIDPipe()) id: string) {
      const ord = this.ordersService.getById(id);
      if (!ord) throw new NotFoundException('Order not found');
      return ord;
    }

    @Delete('/:id')
    public deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
      if(!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');

      this.ordersService.deleteById(id);
      return {success: true};
    };

    @Post('/')
    create(@Body() productData: CreateOrderDTO) {
      return this.ordersService.create(productData);
    };

    @Put('/:id')
    update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
    ) {
      if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');

      this.ordersService.updateById(id, orderData);
      return { success: true };
    }
}
  