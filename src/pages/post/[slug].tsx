import client from "graphql/client"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"

import { GET_POSTS_SLUG, GET_POST_BY_SLUG } from "graphql/queries"
import { GetPostBySlugQuery, GetPostsSlugQuery, Post as PostType } from "graphql/generated/graphql"

import LayoutMain from "components/layout/Main"
import HeaderPost from "components/post/Header"
import ContentPost from "components/post/Content"
import Loader from "components/ui/Loader"

type PostProps = {
    post: Pick<PostType, 'coverImage' | 'seo' | 'title' | 'tag' | 'content' | 'author' | 'createdAt'>
}

const Post = ({ post }: PostProps) => {
    const router = useRouter()

    return (
        <LayoutMain footer>
            <section className='min-h-inherit'>
                <div className='max-w-6xl min-h-inherit w-full mx-auto px-5'>
                    {
                        router.isFallback && (
                            <div className='min-h-inherit flex flex-col items-center justify-center'>
                                <Loader />
                                <p className='font-semibold text-emerald-600'>Carregando ...</p>
                            </div>
                        )
                    }
                    {
                        post && (
                            <>
                                <HeaderPost 
                                    title={post.title}
                                    tags={post.tag}
                                    author={post.author}
                                    createdAt={post.createdAt}
                                />
                                <ContentPost 
                                    content={post.content}
                                    coverImage={post.coverImage}
                                    title={post.title}
                                />
                            </>
                        )
                    }
                </div>
            </section>
        </LayoutMain>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { posts } = await client.request<GetPostsSlugQuery>(GET_POSTS_SLUG, { first: 3 })

    const paths = posts.map(({ slug }) => ({
        params: { slug }
    }))

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context
    const { post } = await client.request<GetPostBySlugQuery>(GET_POST_BY_SLUG, { slug: `${params?.slug}` })

    if(!post) return { notFound: true }

    return {
        props: {
            post
        }
    }
}

export default Post