import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                `./src/server/.env.${process.env.NODE_ENV}`,
                './src/server/.env',
            ],
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'web-chat',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        GraphQLModule.forRoot({
            playground: {
                settings: {
                    'request.credentials': 'include',
                },
            },
            installSubscriptionHandlers: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            subscriptions: {
                'subscriptions-transport-ws': {
                    path: '/ws',
                    onConnect: (params) => {
                        return { req: { headers: params } };
                    },
                },
            },
            context: ({ req, res }) => ({ req, res }),
            cors: {
                origin: true,
                credentials: true,
            },
        }),
        AuthModule.forRoot(),
        ChatModule,
    ],
    providers: [AppService],
})
export class AppModule {}
