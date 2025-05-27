import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? '', {
      connectionFactory: (connection: Connection) => {
        Logger.log('Successfully Connected to db');
        return connection;
      },
    }),
    UsersModule,
  ],
  controllers: [],
})
export class AppModule {}
