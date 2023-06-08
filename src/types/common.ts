export interface ReviewCardProps {
  profileImage: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface RevieCardItemProps extends ReviewCardProps {
  reviewId: number;
}
