import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortafoliosService } from './portafolios/portafolios.service';
import { PortafoliosController } from './portafolios/portafolios.controller';

@Module({
  imports: [],
  controllers: [AppController, PortafoliosController],
  providers: [AppService, PortafoliosService],
})
export class AppModule { }
