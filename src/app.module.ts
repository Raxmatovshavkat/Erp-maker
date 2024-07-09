import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { OrderProductsModule } from './order_products/order_products.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { LoggingInterceptor } from './log/logging.intercetor';
import { Log } from './log/entities/log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DIALECT as any,
      host: process.env.HOST,
      port: parseInt(process.env.PORT_DB, 10),
      username: 'postgres',
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadModels: process.env.AUTO_LOAD_MODELS === 'true',
      synchronize: process.env.SYNCHRONIZE === 'true',
      logging:false
    }),
    SequelizeModule.forFeature([Log]),
    AuthModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    OrderProductsModule,
    RefreshTokenModule,
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule { }
