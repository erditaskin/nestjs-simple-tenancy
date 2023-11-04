import {
  Body,
  Controller,
  Param,
  Put,
  Post,
  ParseIntPipe,
  Req,
  Res,
  Inject,
  HttpStatus,
  Delete,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateTenantDTO, UpdateTenantDTO } from './tenant.dto';
import { Tenant } from './tenant.entity';
import { TenantService } from './tenant.service';

@Controller('Tenant')
export class TenantController {
  @Inject(TenantService)
  private readonly service: TenantService;

  /**
   * User only can create a category for itself.
   */

  @Put('create')
  public async create(
    @Body() body: CreateTenantDTO,
    @Res() response: Response,
  ): Promise<Response | never> {
    try {
      const tenant = this.service.create(body);
      return response.status(HttpStatus.OK).send({ tenant, success: true });
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Post('update/:id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTenantDTO,
    @Res() response: Response,
  ): Promise<Response | never> {
    try {
      const data = await this.service.findOne(id);
      if (data instanceof Tenant) {
        const update = this.service.update(body, data);
        // control if image upload has to be done here.
        // image ??
        // delete old images

        return response.status(HttpStatus.OK).send({ update, success: true });
      } else {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('delete/:id')
  public async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response | never> {
    try {
      const data = await this.service.findOne(id);

      if (data instanceof Tenant) {
        const deleted = await this.service.remove(data);
        return response.status(HttpStatus.OK).send({ deleted, success: true });
      } else {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
