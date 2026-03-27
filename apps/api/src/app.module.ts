import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantController } from './modules/tenants/tenant.controller';
import { WorkflowsModule } from './modules/workflows/workflows.module';
import { TenantMiddleware } from './common/middleware/tenant.middleware';
import { PontosModule } from './modules/pontos';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      logging: false
    }),
    AuthModule,
    WorkflowsModule,
    PontosModule
  ],
  controllers: [TenantController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude({ path: 'health', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
