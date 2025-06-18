import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Permissions } from '../auth/permissions.decorator';
import { permission } from 'process';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  
  @Post()
  @Permissions('create:orders')
  @UseGuards(AuthGuard)
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.id;
    return this.orderService.create({...createOrderDto, userId });
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.orderService.remove(+id);
    return { message: 'Deleted' };
  }

  @Put(':id')
  updateFull(@Param('id') id: string, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.updateFull(+id, createOrderDto);
  }

}
