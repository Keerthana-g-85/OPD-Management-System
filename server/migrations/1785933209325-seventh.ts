import type{ MigrationInterface, QueryRunner } from "typeorm";

export class Seventh1785933209325 implements MigrationInterface {
    name = 'Seventh1785933209325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prescrip_medicine" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "prescriptionId" uuid, "medicineId" uuid, CONSTRAINT "PK_d924393f7ac15fd7c7fc126baf3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD "consultationId" uuid`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD CONSTRAINT "FK_5de72626956a6994f003aa5b15d" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescrip_medicine" ADD CONSTRAINT "FK_c1d9fe9d808a6a3f98f6feb743a" FOREIGN KEY ("prescriptionId") REFERENCES "prescription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescrip_medicine" ADD CONSTRAINT "FK_06b84d512e3f10d4e5b5c98f6b7" FOREIGN KEY ("medicineId") REFERENCES "medicine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prescrip_medicine" DROP CONSTRAINT "FK_06b84d512e3f10d4e5b5c98f6b7"`);
        await queryRunner.query(`ALTER TABLE "prescrip_medicine" DROP CONSTRAINT "FK_c1d9fe9d808a6a3f98f6feb743a"`);
        await queryRunner.query(`ALTER TABLE "prescription" DROP CONSTRAINT "FK_5de72626956a6994f003aa5b15d"`);
        await queryRunner.query(`ALTER TABLE "prescription" DROP COLUMN "consultationId"`);
        await queryRunner.query(`ALTER TABLE "prescription" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TABLE "prescrip_medicine"`);
    }

}
