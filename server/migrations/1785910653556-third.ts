import type{ MigrationInterface, QueryRunner } from "typeorm";

export class Third1785910653556 implements MigrationInterface {
    name = 'Third1785910653556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmacist" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "pharmacist" ADD CONSTRAINT "UQ_68e61a0273932c5703087f224b0" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "pharmacist" ADD CONSTRAINT "FK_68e61a0273932c5703087f224b0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmacist" DROP CONSTRAINT "FK_68e61a0273932c5703087f224b0"`);
        await queryRunner.query(`ALTER TABLE "pharmacist" DROP CONSTRAINT "UQ_68e61a0273932c5703087f224b0"`);
        await queryRunner.query(`ALTER TABLE "pharmacist" DROP COLUMN "user_id"`);
    }

}
