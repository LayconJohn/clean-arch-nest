import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { RouteInMemoryRepository } from 'src/@core/infra/db/in-memory/route-in-memory.repository';
import { CreateRouteUseCase } from 'src/@core/application/create-route.use-case';
import { ListAllRoutesUseCase } from 'src/@core/application/list-all-route.use-case';

@Module({
  controllers: [RoutesController],
  providers: [
    RoutesService,
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
