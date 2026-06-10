import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://abono:abono123@localhost:5432/abono_el_lago',
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.warn('Prisma connection skipped during local bootstrap:', error instanceof Error ? error.message : error);
    }
  }
}
