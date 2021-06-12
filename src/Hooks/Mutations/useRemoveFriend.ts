import { useMutation, useQueryClient } from "react-query";
import { removeBefriendedFriend } from "../../api";

export default function useRemoveFriend() {
  const queryClient = useQueryClient();
  return useMutation((userId: number) => removeBefriendedFriend(userId), {
    onSettled() {
      queryClient.invalidateQueries("my user friends");
      queryClient.invalidateQueries("my user data");
    }
  });
}
