import type{ MigrationInterface, QueryRunner } from "typeorm";

export class Eleven1786268066496 implements MigrationInterface {
    name = 'Eleven1786268066496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "pharmacist" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "status" boolean NOT NULL default true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "pharmacist" ADD "status" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "status" boolean NOT NULL DEFAULT true`);
    }

}
