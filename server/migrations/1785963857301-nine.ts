import type{ MigrationInterface, QueryRunner } from "typeorm";

export class Nine1785963857301 implements MigrationInterface {
    name = 'Nine1785963857301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_9f9596ccb3fe8e63358d9bfcbdb"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "REL_9f9596ccb3fe8e63358d9bfcbd"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_9f9596ccb3fe8e63358d9bfcbdb" FOREIGN KEY ("slot_id") REFERENCES "slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_9f9596ccb3fe8e63358d9bfcbdb"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "REL_9f9596ccb3fe8e63358d9bfcbd" UNIQUE ("slot_id")`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_9f9596ccb3fe8e63358d9bfcbdb" FOREIGN KEY ("slot_id") REFERENCES "slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
