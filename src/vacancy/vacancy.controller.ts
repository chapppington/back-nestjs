import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { VacancyService } from "./vacancy.service";
import { CreateVacancyDto } from "./dto/create-vacancy.dto";
import { UpdateVacancyDto } from "./dto/update-vacancy.dto";
import { Auth } from "@/auth/decorators/auth.decorator";
import { Role } from "@prisma/client";

@Controller("vacancy")
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post()
  @Auth(Role.MANAGER)
  create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacancyService.create(createVacancyDto);
  }

  @Get()
  findAll() {
    return this.vacancyService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.vacancyService.findOne(id);
  }

  @Patch(":id")
  @Auth(Role.MANAGER)
  update(@Param("id") id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacancyService.update(id, updateVacancyDto);
  }

  @Delete(":id")
  @Auth(Role.MANAGER)
  remove(@Param("id") id: string) {
    return this.vacancyService.remove(id);
  }
}
