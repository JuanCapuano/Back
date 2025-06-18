import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentStatus } from './entities/payment.entity';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.paymentService.remove(+id);
    return { message: 'Deleted' };
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: number, @Body() body: { status: PaymentStatus }) {
  return this.paymentService.updateStatus(id, body.status);
}

  @Post(':id/refund')
  refund(@Param('id') id: number, @Body() body: { reason: string }) {
    return this.paymentService.refund(id, body.reason);
  }

}
