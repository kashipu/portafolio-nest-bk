import { Test, TestingModule } from '@nestjs/testing';
import { PortafoliosController } from './portafolios.controller';

describe('PortafoliosController', () => {
  let controller: PortafoliosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortafoliosController],
    }).compile();

    controller = module.get<PortafoliosController>(PortafoliosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
