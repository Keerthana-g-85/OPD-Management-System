import type{ MigrationInterface, QueryRunner } from "typeorm";

export class Sixth1785925831414 implements MigrationInterface {
    name = 'Sixth1785925831414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultation" ADD "appointment_id" uuid`);
        await queryRunner.query(`ALTER TABLE "consultation" ADD CONSTRAINT "UQ_0aa1d27dba50dc2b9781bf2252e" UNIQUE ("appointment_id")`);
        await queryRunner.query(`ALTER TABLE "consultation" ADD CONSTRAINT "FK_0aa1d27dba50dc2b9781bf2252e" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultation" DROP CONSTRAINT "FK_0aa1d27dba50dc2b9781bf2252e"`);
        await queryRunner.query(`ALTER TABLE "consultation" DROP CONSTRAINT "UQ_0aa1d27dba50dc2b9781bf2252e"`);
        await queryRunner.query(`ALTER TABLE "consultation" DROP COLUMN "appointment_id"`);
    }

}
