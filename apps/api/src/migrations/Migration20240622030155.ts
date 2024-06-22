import { Migration } from '@mikro-orm/migrations';

export class Migration20240622030155 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "role" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null);');
    this.addSql('alter table "role" add constraint "role_name_unique" unique ("name");');

    this.addSql('create table "user" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "is_active" boolean not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('create index "user_is_active_index" on "user" ("is_active");');

    this.addSql('create table "user_role" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" uuid not null, "role_id" int not null);');
    this.addSql('alter table "user_role" add constraint "user_role_user_id_role_id_unique" unique ("user_id", "role_id");');

    this.addSql('alter table "user_role" add constraint "user_role_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "user_role" add constraint "user_role_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_role" drop constraint "user_role_role_id_foreign";');

    this.addSql('alter table "user_role" drop constraint "user_role_user_id_foreign";');

    this.addSql('drop table if exists "role" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "user_role" cascade;');
  }

}
