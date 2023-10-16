import { PrismaClient } from "@prisma/client";
import { Person } from "./types";

export class Database {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async $disconnect() {
    await this.prisma.$disconnect();
  }

  async createPerson(data: Person) {
    const person = await this.prisma.person.create({ data });
    return person;
  }
}

export * from "@prisma/client";
