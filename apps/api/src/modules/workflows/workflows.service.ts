import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { randomUUID } from 'node:crypto';

export interface WorkflowRecord {
  id: string;
  tenantId: string;
  nome: string;
  descricao?: string;
  createdAt: string;
}

@Injectable()
export class WorkflowsService {
  private readonly workflows: WorkflowRecord[] = [];

  create(tenantId: string, payload: CreateWorkflowDto): WorkflowRecord {
    const workflow: WorkflowRecord = {
      id: randomUUID(),
      tenantId,
      nome: payload.nome,
      descricao: payload.descricao,
      createdAt: new Date().toISOString()
    };

    this.workflows.push(workflow);
    return workflow;
  }

  listByTenant(tenantId: string): WorkflowRecord[] {
    return this.workflows.filter((workflow) => workflow.tenantId === tenantId);
  }
}
