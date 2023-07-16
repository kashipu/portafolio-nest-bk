import { Body, Controller, Get, Header, Headers, HttpCode, HttpStatus, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { EmailGuard } from '../email/email.guard';
import { CrearProyectoDTO, PortafoliosService, Proyecto } from './portafolios.service';

@Controller('portafolios')
@UseGuards(EmailGuard)
export class PortafoliosController {
    constructor(private portafoliosService: PortafoliosService) { }

    @Get('')
    darProyectos(@Headers(EmailGuard.EMAIL_HEADER) email: string): Proyecto[] {
        return this.portafoliosService.darProyectos(email)
    }

    @Get(':id')
    darProyecto(@Param('id') id: string, @Headers(EmailGuard.EMAIL_HEADER) email: string): Proyecto {
        const proyecto = this.portafoliosService.darProyecto(id, email);
        if (!proyecto) {
            throw new NotFoundException(`No se encontró un proyecto con el ID '${id}'`);
        }
        return proyecto;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() cDTO: CrearProyectoDTO, @Headers(EmailGuard.EMAIL_HEADER) email: string): Proyecto {
        return this.portafoliosService.agregarProyecto(cDTO, email);
    }
}
