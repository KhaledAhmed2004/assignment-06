// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { initPayment as initPaymentApi } from "../../services/apiPayments";
// import toast from "react-hot-toast";

// export function useInitPayment() {
//   const queryClient = useQueryClient();

//   const {
//     mutate: initPayment,
//     isPending,
//     error,
//   } = useMutation({
//     mutationFn: initPaymentApi,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["payments"],
//       });
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });

//   return { initPayment, isPending, error };
// }

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { initPayment as initPaymentApi } from "../../services/apiPayments";
import toast from "react-hot-toast";

export function useInitPayment() {
  const queryClient = useQueryClient();

  const {
    mutate: initPayment,
    isPending,
    error,
  } = useMutation({
    mutationFn: initPaymentApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
      if (data?.payment_url) {
        return data.payment_url;
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { initPayment, isPending, error };
}
