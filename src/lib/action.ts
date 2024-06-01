import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants/api";
import { IListProductServer } from "../definitions/api";

export const useGetProducts = () => {
  return useQuery<IListProductServer[]>({
    queryKey: ["product-list"],
    queryFn: async () => {
      const url = `${API_URL}/products`;
      const res = await axios.get(url);
      return res.data;
    },
  });
};

export const useSaveUpdatedItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IListProductServer) =>
      axios.put(`${API_URL}/products/${data.id}`, { ...data }),
    onSuccess: (_data, variables) => {
      const previousData = queryClient.getQueryData([
        "product-list",
      ]) as IListProductServer[];

      const newData = previousData.map((item) => {
        if (item.id === variables.id) {
          return variables;
        }
        return item;
      });

      queryClient.setQueryData(["product-list"], newData);
    },
  });
};
