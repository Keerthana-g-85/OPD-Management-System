import type{ MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1785836591257 implements MigrationInterface {
    name = 'InitialMigration1785836591257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appoitment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "appoitment_date" date NOT NULL, "slot" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "doctor_id" uuid, CONSTRAINT "PK_428f3fed3aca99e3fa707b3cef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "notes" character varying NOT NULL, "follow_up" character varying NOT NULL, "status" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5203569fac28a4a626c42abe70b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medicine" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b9e0e6f37b7cadb5f402390928b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pharmacist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "qualification" character varying NOT NULL, "experience" integer NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_236fcaf7e1f860652c7db179295" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prescription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dosage" character varying NOT NULL, "frequency" integer NOT NULL, "duration" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_eaba5e4414e5382781e08467b51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "height" character varying NOT NULL, "weight" character varying NOT NULL, "marital_status" boolean NOT NULL, "occupation" character varying NOT NULL, "allergies" boolean NOT NULL, "user_id" uuid, CONSTRAINT "REL_f20f0bf6b734938c710e12c278" UNIQUE ("user_id"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "department" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "status" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "appoitment" ADD CONSTRAINT "FK_06a31ac79e8e597414a5cd2d9e6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appoitment" ADD CONSTRAINT "FK_ed242a6765f99a613208eb525e8" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_f20f0bf6b734938c710e12c2782" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_f20f0bf6b734938c710e12c2782"`);
        await queryRunner.query(`ALTER TABLE "appoitment" DROP CONSTRAINT "FK_ed242a6765f99a613208eb525e8"`);
        await queryRunner.query(`ALTER TABLE "appoitment" DROP CONSTRAINT "FK_06a31ac79e8e597414a5cd2d9e6"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "prescription"`);
        await queryRunner.query(`DROP TABLE "pharmacist"`);
        await queryRunner.query(`DROP TABLE "medicine"`);
        await queryRunner.query(`DROP TABLE "consultation"`);
        await queryRunner.query(`DROP TABLE "appoitment"`);
    }

}
