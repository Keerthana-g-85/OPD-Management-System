import type{ MigrationInterface, QueryRunner } from "typeorm";

export class Eight1785958707945 implements MigrationInterface {
    name = 'Eight1785958707945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "slot" DROP COLUMN "status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "slot" ADD "status" boolean NOT NULL`);
    }

}
