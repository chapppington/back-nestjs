import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateSubmissionDto } from "./dto/create-submission.dto";
import { UpdateSubmissionDto } from "./dto/update-submission.dto";

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  private addFileUrls(submission: any) {
    if (submission.files && submission.files.length > 0) {
      submission.fileUrls = submission.files.map(
        (fileName: string) => `/uploads/submissions/${fileName}`
      );
    }
    return submission;
  }

  create(createSubmissionDto: CreateSubmissionDto) {
    return this.prisma.formSubmission
      .create({
        data: createSubmissionDto,
      })
      .then(this.addFileUrls.bind(this));
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
    return this.prisma.formSubmission
      .update({
        where: { id },
        data: updateSubmissionDto,
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
