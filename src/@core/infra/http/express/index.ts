import express, { Express, Request, Response } from 'express';
import { RouteInMemoryRepository } from '../../db/in-memory/route-in-memory.repository';
import { CreateRouteUseCase } from 'src/@core/application/create-route.use-case';
import { ListAllRoutesUseCase } from 'src/@core/application/list-all-route.use-case';

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const routeRepo = new RouteInMemoryRepository();

app.get('/routes', async (_req: Request, res: Response) => {
  const listAllUseCase = new ListAllRoutesUseCase(routeRepo);
  const output = await listAllUseCase.execute();
  res.json(output);
});

app.post('/routes', async (req: Request, res: Response) => {
  const createUseCase = new CreateRouteUseCase(routeRepo);
  const output = await createUseCase.execute(req.body);
  res.status(201).json(output);
});

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});