import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { WorkflowsService } from './workflows.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Get()
  list(@Req() req: Request) {
    return this.workflowsService.listByTenant(req.tenant!.tenantId);
  }

  @Post()
  create(@Req() req: Request, @Body() body: CreateWorkflowDto) {
    return this.workflowsService.create(req.tenant!.tenantId, body);
  }
}
