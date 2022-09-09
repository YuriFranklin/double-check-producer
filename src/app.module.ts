import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Error as ErrorSchema } from './@core/infra/db/typeorm/entity/Error';
import { Course as CourseSchema } from './@core/infra/db/typeorm/entity/Course';
import { DoubleCheck as DoubleCheckSchema } from './@core/infra/db/typeorm/entity/DoubleCheck';
import { DoublecheckModule } from './doublecheck/doublecheck.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            //ignoreEnvFile: true,
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.PG_HOSTNAME,
            username: process.env.PG_USER_NAME,
            password: process.env.PG_PASSWORD,
            port: Number(process.env.PG_PORT),
            database: 'double_check',
            synchronize: true,
            logging: false,
            entities: [ErrorSchema, CourseSchema, DoubleCheckSchema],
        }),
        AuthModule,
        DoublecheckModule,
    ],
})
export class AppModule {}
