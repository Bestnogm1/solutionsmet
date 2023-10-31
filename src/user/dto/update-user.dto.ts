export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  bio: string;
  profileImage?: string;
  taskAssignedToMe?: string[];
}