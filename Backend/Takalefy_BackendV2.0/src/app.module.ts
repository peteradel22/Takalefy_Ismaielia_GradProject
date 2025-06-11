import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { IncomesModule } from "./finance/incomes/incomes.module";
import { DatabaseModule } from "./database/database.module";
import { PrismaModule } from "../prisma/prisma.module"; // Import PrismaModule
import { CategoryModule } from "./category/category.module";
import { TransactionModule } from "./transaction/transaction.module";
import { UserGoalModule } from "./user-goal/user-goal.module";
import { NotificationModule } from "./notification/notification.module";
import { UserSettingModule } from "./userSetting/user-setting.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    IncomesModule,
    DatabaseModule,
    PrismaModule,
    CategoryModule,
    TransactionModule,
    UserGoalModule,
    NotificationModule,
    UserSettingModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
