import { fetchApi } from "@/helpers/fetchApiHelper";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import { PostInterface } from "@/interfaces/Post";
import Pagination from "@/components/Pagination";

const getData = async (page = 1, pageSize = 2) => {
  const path = "/posts";
  const urlParamsObject = {
    populate: "*",
    sort: {
      createdAt: "asc",
    },
    pagination: {
      page,
      pageSize,
    },
  };
  const { data, meta } = await fetchApi(path, urlParamsObject);
  return {
    data,
    pagination: meta.pagination,
  };
};

interface Props {
  searchParams: {
    page?: string;
  };
}

const Blog = async ({ searchParams }: Props) => {
  const { page } = searchParams;
  let pageNumber = page ? parseInt(page) : 1;

  if(isNaN(pageNumber) || pageNumber < 1) pageNumber = 1
  const { data, pagination } = await getData(Number(pageNumber));
  return (
    <div className="space-y-8">
      <PageHeader text="Blog" />
      <Pagination pagination={pagination} />
      <div className="grid gap-4">
        {data.map((post: PostInterface) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
