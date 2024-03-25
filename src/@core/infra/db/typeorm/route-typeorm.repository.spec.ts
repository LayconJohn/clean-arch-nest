import { DataSource } from "typeorm";
import { RouteSchema } from "./route.schema";
import { Route, RouteProps } from "../../../domain/route.entity";
import { RouteTypeOrmRepository } from "./route-typeorm.repository";

describe("Route Typeorm repository test", () => {
    it("Should insert a new Route", async () => {
        const dataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            logging: true,
            entities: [RouteSchema]
        });
        await dataSource.initialize()

        const ormRepo = dataSource.getRepository(Route)
        const repository = new RouteTypeOrmRepository(ormRepo);
        const routeProps: RouteProps = {
            title: 'minha rota',
            startPosition: { lat: 0, lng: 1 },
            endPosition: { lat: 2, lng: 3 },
        };
        const route = Route.create(routeProps);
        await repository.insert(route);

        const routeFound = await ormRepo.findOneBy({ id: route.id });
        expect(routeFound.toJSON()).toStrictEqual(route.toJSON())
    });
});