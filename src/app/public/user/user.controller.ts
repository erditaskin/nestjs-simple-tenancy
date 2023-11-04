// import {
//   Body,
//   ClassSerializerInterceptor,
//   Controller,
//   Get,
//   Param,
//   Put,
//   Post,
//   ParseIntPipe,
//   Req,
//   UseGuards,
//   UseInterceptors,
//   Inject,
//   HttpStatus,
//   HttpException,
// } from '@nestjs/common';
// import { Request } from 'express';
// import { UpdateProfileDto } from './user.dto';
// import { User } from './user.entity';
// import { UsersService } from './users.service';
// import { User as GetUser } from '@/common/decorators/user.decorator';

// @Controller('users')
// export class UsersController {
//   @Inject(UsersService)
//   private readonly service: UsersService;

//   @Get('profile/:id')
//   public async profile(@Param('id', ParseIntPipe) id: number): Promise<object> {
//     const user:User = await this.service.findOne(id);

//     if (!user) {
//       throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
//     }

//     return {
//       id: user.id,
//       username: user.username,
//       fullname: user.fullname,
//       // clothes
//       // posts
//     };
//   }

//   @Get('account')
//   public async account(@GetUser() user: User): Promise<User> {
//     const find:User = await this.service.findOne(user.id);

//     if (find.password) {
//       delete find.password;
//     }

//     return find;
//   }

//   @Put('update')
//   @UseInterceptors(ClassSerializerInterceptor)
//   public async update(
//     @Body() body: UpdateProfileDto,
//     @Req() req: Request
//   ): Promise<User> {
//     return await this.service.update(body, req);
//   }

// }
