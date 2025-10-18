import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateSubmissionDto } from "./dto/create-submission.dto";
import { UpdateSubmissionDto } from "./dto/update-submission.dto";
import { EmailService } from "@/email/email.service";

@Injectable()
export class SubmissionsService {
  private readonly logger = new Logger(SubmissionsService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService
  ) {}

  private addFileUrls(submission: any) {
    if (submission.files && submission.files.length > 0) {
      submission.fileUrls = submission.files.map(
        (fileName: string) => `/uploads/submissions/${fileName}`
      );
    }
    return submission;
  }

  async create(createSubmissionDto: CreateSubmissionDto) {
    // Преобразуем consent из строки в булево значение
    const data = {
      ...createSubmissionDto,
      consent:
        (createSubmissionDto.consent as any) === "true" ||
        createSubmissionDto.consent === true,
    };

    const submission = await this.prisma.formSubmission
      .create({
        data,
      })
      .then(this.addFileUrls.bind(this));

    // Отправляем уведомление по email о новой заявке
    try {
      await this.emailService.sendSubmissionNotification(submission);
      this.logger.log(`Email уведомление отправлено для заявки ID: ${submission.id}`);
    } catch (error) {
      this.logger.error(
        `Не удалось отправить email уведомление для заявки ID: ${submission.id}`,
        error.stack
      );
      // Не прерываем создание заявки, если email не отправился
    }

    return submission;
  }

  async findAll() {
    const submissions = await this.prisma.formSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return submissions.map(this.addFileUrls.bind(this));
  }

  findOne(id: string) {
    return this.prisma.formSubmission
      .findUnique({
        where: { id },
      })
      .then(this.addFileUrls.bind(this));
  }

  update(id: string, updateSubmissionDto: UpdateSubmissionDto) {
    // Преобразуем consent из строки в булево значение, если он присутствует
    const data = { ...updateSubmissionDto };
    if (data.consent !== undefined) {
      data.consent = (data.consent as any) === "true" || data.consent === true;
    }

    return this.prisma.formSubmission
      .update({
        where: { id },
        data,
      })
      .then(this.addFileUrls.bind(this));
  }

  remove(id: string) {
    return this.prisma.formSubmission.delete({
      where: { id },
    });
  }

  async findByFormType(formType: string) {
    const submissions = await this.prisma.formSubmission.findMany({
      where: { formType: formType as any },
      orderBy: {
        createdAt: "desc",
      },
    });
    return submissions.map(this.addFileUrls.bind(this));
  }
}
