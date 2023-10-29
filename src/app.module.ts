import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule, ProjectModule, MongooseModule.forRoot('mongodb+srv://Bestnogm:1231234560s@koffi0.vbmwl.mongodb.net/ticketApp?')],
  controllers: [AppController,],
  providers: [AppService,],
})

export class AppModule { }
