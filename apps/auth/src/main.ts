import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from './auth.pb';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5052',
        package: protobufPackage,
        protoPath: path.join(__dirname, '../../proto/auth.proto'),
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidUnknownValues: true }),
  );

  await app.listen();
}

bootstrap();

// /   protoPath: path.join(__dirname, '../../proto/auth.proto'),

// (
//   {
//     transport: Transport.GRPC,
//     options: {
//       url: URL,
//       package: protobufPackage,
//       protoPath: path.join(__dirname, '../../proto/auth.proto'),
//     },
//   },
//   { inheritAppConfig: true },
// );
