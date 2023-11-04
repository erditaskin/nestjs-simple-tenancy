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
import { CreateCompanyDTO, UpdateCompanyDTO } from './company.dto';
import { Company } from './company.entity';
import { CompanyService } from './company.service';

@Controller('Company')
export class CompanyController {
  @Inject(CompanyService)
  private readonly service: CompanyService;

  @Put('create')
  public async create(
    @Body() body: CreateCompanyDTO,
    @Res() response: Response,
  ): Promise<Response | never> {
    try {
      const Company = this.service.create(body);
      return response.status(HttpStatus.OK).send({ Company, success: true });
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Post('update/:id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCompanyDTO,
    @Res() response: Response,
  ): Promise<Response | never> {
    try {
      const data = await this.service.findOne(id);
      if (data instanceof Company) {
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

      if (data instanceof Company) {
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
