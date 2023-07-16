import { Test, TestingModule } from '@nestjs/testing';
import { PortafoliosService } from './portafolios.service';

describe('PortafoliosService', () => {
  let service: PortafoliosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortafoliosService],
    }).compile();

    service = module.get<PortafoliosService>(PortafoliosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
