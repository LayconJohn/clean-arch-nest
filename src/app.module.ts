import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RoutesModule } from './routes/routes.module';
import { TypeOrmModule } from "@nestjs/typeorm"
import { RouteSchema } from './@core/infra/db/typeorm/route.schema';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    RoutesModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: join(__dirname, 'database.sqlite'),
      synchronize: true,
      logging: false,
      entities: [RouteSchema]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
