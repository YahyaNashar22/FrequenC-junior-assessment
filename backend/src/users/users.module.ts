import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
  ],
})
export class UsersModule {}
