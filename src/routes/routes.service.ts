import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { CreateRouteUseCase } from 'src/@core/application/create-route.use-case';
import { ListAllRoutesUseCase } from 'src/@core/application/list-all-route.use-case';

@Injectable()
export class RoutesService {

  constructor(
    private readonly createRouteUseCase: CreateRouteUseCase,
    private readonly listAllRoutesUseCase: ListAllRoutesUseCase
  ){}

  create(createRouteDto: CreateRouteDto) {
    return this.createRouteUseCase.execute(createRouteDto)
  }

  findAll() {
    return this.listAllRoutesUseCase.execute()
  }


}
