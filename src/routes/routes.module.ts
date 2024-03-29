import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { RouteInMemoryRepository } from 'src/@core/infra/db/in-memory/route-in-memory.repository';
import { CreateRouteUseCase } from 'src/@core/application/create-route.use-case';
import { ListAllRoutesUseCase } from 'src/@core/application/list-all-route.use-case';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { RouteSchema } from 'src/@core/infra/db/typeorm/route.schema';
import { RouteTypeOrmRepository } from 'src/@core/infra/db/typeorm/route-typeorm.repository';
import { DataSource } from 'typeorm';
import { Route } from '../@core/domain/route.entity';


//TO_DO: implementar namespace para organizar
@Module({
  imports: [
    TypeOrmModule.forFeature([RouteSchema])
  ],
  controllers: [RoutesController],
  providers: [
    RoutesService,
    {
      provide: RouteTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new RouteTypeOrmRepository(dataSource.getRepository(Route));
      },
      inject: [getDataSourceToken()]
    },
    {
      provide: RouteInMemoryRepository,
      useClass: RouteInMemoryRepository
    },
    {
      provide: CreateRouteUseCase,
      useFactory: (routeRepo: RouteInMemoryRepository) => {
        return new CreateRouteUseCase(routeRepo)
      },
      inject: [RouteInMemoryRepository]
    },
    {
      provide: ListAllRoutesUseCase,
      useFactory: (routeRepo: RouteInMemoryRepository) => {
        return new ListAllRoutesUseCase(routeRepo)
      },
      inject: [RouteInMemoryRepository]
    }
  ]
})
export class RoutesModule {}
