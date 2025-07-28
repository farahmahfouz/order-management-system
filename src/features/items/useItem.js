import { useQuery } from "@tanstack/react-query";
import { getOneItem } from "../../services/apiItems";
import { useParams } from "react-router-dom";

function useItem() {
  const { itemId } = useParams();
  const { isPending, data: item } = useQuery({
    queryKey: ["items", itemId],
    queryFn: () => getOneItem(itemId),
  });
  console.log(item)
  return { isPending, item };
}

export default useItem;
