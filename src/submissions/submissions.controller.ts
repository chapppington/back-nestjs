import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Logger,
  Query,
} from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { SubmissionsService } from "./submissions.service";
import { CreateSubmissionDto } from "./dto/create-submission.dto";
import { UpdateSubmissionDto } from "./dto/update-submission.dto";
import { Auth } from "@/auth/decorators/auth.decorator";
import { Role } from "@prisma/client";

@Controller("submissions")
export class SubmissionsController {
  private readonly logger = new Logger(SubmissionsController.name);

  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: "./uploads/submissions",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Разрешенные типы файлов
        const allowedMimeTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new Error(
              "Недопустимый тип файла. Разрешены только PDF, DOC, DOCX"
            ),
            false
          );
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    })
  )
  create(
    @Body() createSubmissionDto: CreateSubmissionDto,
    @UploadedFiles() files?: Express.Multer.File[]
  ) {
    if (files && files.length > 0) {
      this.logger.debug(
        `Files received: ${files.map((f) => f.originalname).join(", ")}`
      );
      createSubmissionDto.files = files.map((file) => file.filename);
    }

    return this.submissionsService.create(createSubmissionDto);
  }

  @Get()
  @Auth(Role.MANAGER)
  findAll(@Query("formType") formType?: string) {
    if (formType) {
      return this.submissionsService.findByFormType(formType);
    }
    return this.submissionsService.findAll();
  }

  @Get(":id")
  @Auth(Role.MANAGER)
  findOne(@Param("id") id: string) {
    return this.submissionsService.findOne(id);
  }

  @Patch(":id")
  @Auth(Role.MANAGER)
  update(
    @Param("id") id: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto
  ) {
    return this.submissionsService.update(id, updateSubmissionDto);
  }

  @Delete(":id")
  @Auth(Role.MANAGER)
  remove(@Param("id") id: string) {
    return this.submissionsService.remove(id);
  }
}
