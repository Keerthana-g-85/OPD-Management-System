import type{ MigrationInterface, QueryRunner } from "typeorm";

export class Ten1785998464810 implements MigrationInterface {
    name = 'Ten1785998464810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prescription" DROP CONSTRAINT "FK_5de72626956a6994f003aa5b15d"`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD CONSTRAINT "FK_5de72626956a6994f003aa5b15d" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prescription" DROP CONSTRAINT "FK_5de72626956a6994f003aa5b15d"`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD CONSTRAINT "FK_5de72626956a6994f003aa5b15d" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
