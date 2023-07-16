import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ArrayUnique, IsDate, IsDateString, IsOptional, IsUrl, MaxLength, MinLength } from 'class-validator';

export interface Proyecto {
    id: string;
    nombre: string;
    fechaCreacion: Date;
    descripcion: string;
    url?: string;
    imagenes?: string[];
}

export class CrearProyectoDTO {
    @MinLength(1)
    @MaxLength(128)
    nombre: string;

    @IsDateString()
    fechaCreacion: string;

    @MinLength(1)
    @MaxLength(1024)
    descripcion: string;

    @IsOptional()
    @IsUrl()
    url?: string;

    @IsOptional()
    @ArrayUnique()
    @IsUrl(undefined, { each: true })
    imagenes?: string[];
}

function crearProyecto(dto: CrearProyectoDTO): Proyecto {
    return {
        id: uuidv4(),
        nombre: dto.nombre,
        fechaCreacion: new Date(dto.fechaCreacion),
        descripcion: dto.descripcion,
        url: dto.url,
        imagenes: dto.imagenes,
    }
}

@Injectable()
export class PortafoliosService {
    private portafolios: Map<string, Map<string, Proyecto>> = new Map<string, Map<string, Proyecto>>();

    agregarProyecto(crearProyectoDTO: CrearProyectoDTO, email: string): Proyecto {
        const proyecto = crearProyecto(crearProyectoDTO);
        const proyectos = this.portafolios.get(email) || new Map<string, Proyecto>();
        proyectos.set(proyecto.id, proyecto)
        this.portafolios.set(email, proyectos);
        return proyecto;
    }

    darProyectos(email: string): Proyecto[] {
        const proyectos = this.portafolios.get(email);
        return proyectos ? Array.from(proyectos.values()) : [];
    }

    darProyecto(id: string, email: string): Proyecto | undefined {
        const proyectos = this.portafolios.get(email);
        if (!proyectos) {
            return undefined;
        }
        return proyectos.get(id);
    }
}
