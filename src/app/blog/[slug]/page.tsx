import PageHeader from "@/components/PageHeader";
import { fetchApi } from "@/helpers/fetchApiHelper";
import { PostInterface } from "@/interfaces/Post";
import { notFound } from "next/navigation";
import { formatDate } from "@/helpers/formatDateHelper";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  params: {
    slug: string;
  };
}

const getSinglePost = async (slug: string) => {
  const urlParamsObject = {
    populate: "image",
    filters: {
      slug,
    },
  };
  const { data } = await fetchApi("/posts/", urlParamsObject);
  return data[0];
};

const Slug = async ({ params }: Props) => {
  const post: PostInterface = await getSinglePost(params.slug);

  if (!post) {
    return notFound();
  }
  const { title, description, image, slug, createdAt, body } = post.attributes;
  const { url, width, height } = image.data.attributes.formats.medium ? image.data.attributes.formats.medium : image.data.attributes.formats.thumbnail

  return (
    <div className="space-y-8">
      <PageHeader text={title} />
      <p className="text-gray-500">{formatDate(createdAt)}</p>
      <Image
        className="h-auto rounded-t-lg"
        src={url}
        alt={`img-${title}`}
        width={width}
        height={height}
      />
      <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
        {description}
      </p>
      <div className="prose">

      <MDXRemote source={body}/>
      </div>
    </div>
  );
};

export default Slug;
