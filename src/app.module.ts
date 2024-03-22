import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [ConfigModule.forRoot(), RoutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
