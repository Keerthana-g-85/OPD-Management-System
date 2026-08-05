import type{ MigrationInterface, QueryRunner } from "typeorm";

export class Fourth1785915820354 implements MigrationInterface {
    name = 'Fourth1785915820354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appoitment" RENAME COLUMN "slot" TO "slot_id"`);
        await queryRunner.query(`CREATE TABLE "slot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slot" character varying NOT NULL, "status" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5b1f733c4ba831a51f3c114607b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appoitment" DROP COLUMN "slot_id"`);
        await queryRunner.query(`ALTER TABLE "appoitment" ADD "slot_id" uuid`);
        await queryRunner.query(`ALTER TABLE "appoitment" ADD CONSTRAINT "UQ_bfd1000a3a08968a95d6a002772" UNIQUE ("slot_id")`);
        await queryRunner.query(`ALTER TABLE "appoitment" ADD CONSTRAINT "FK_bfd1000a3a08968a95d6a002772" FOREIGN KEY ("slot_id") REFERENCES "slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appoitment" DROP CONSTRAINT "FK_bfd1000a3a08968a95d6a002772"`);
        await queryRunner.query(`ALTER TABLE "appoitment" DROP CONSTRAINT "UQ_bfd1000a3a08968a95d6a002772"`);
        await queryRunner.query(`ALTER TABLE "appoitment" DROP COLUMN "slot_id"`);
        await queryRunner.query(`ALTER TABLE "appoitment" ADD "slot_id" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "slot"`);
        await queryRunner.query(`ALTER TABLE "appoitment" RENAME COLUMN "slot_id" TO "slot"`);
    }

}
