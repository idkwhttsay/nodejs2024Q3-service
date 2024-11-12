import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
