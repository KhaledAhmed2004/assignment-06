// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deletePost as deletePostApi } from "../../services/apiPosts";
// import toast from "react-hot-toast";

// export function useDeletePost() {
//   const queryClient = useQueryClient();

//   const { isPending, mutate: deletePost } = useMutation({
//     mutationFn: deletePostApi,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["posts"],
//       });
//     },
//     onError: (err) => {
//       toast.error(err.message);
//     },
//   });

//   return { isPending, deletePost };
// }

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost as deletePostApi } from "../../services/apiPosts";
import toast from "react-hot-toast";

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { isPending, mutate: deletePost } = useMutation({
    mutationFn: deletePostApi,
    onMutate: () => {
      // Show a loading toast when the mutation starts
      toast.loading("Deleting post...", { id: "delete-toast" });
    },
    onSuccess: () => {
      // Invalidate queries to refresh the posts list
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      // Update the toast to success
      toast.success("Post deleted successfully!", { id: "delete-toast" });
    },
    onError: (err) => {
      // Show an error message in the toast
      toast.error(err.message, { id: "delete-toast" });
    },
  });

  return { isPending, deletePost };
}
